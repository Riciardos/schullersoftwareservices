package com.schullersoftwareservices.repository;

import com.schullersoftwareservices.model.user.UserPreferences;
import com.schullersoftwareservices.model.user.UserProfile;
import jakarta.inject.Singleton;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.AllArgsConstructor;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.ReturnValue;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

@Singleton
@AllArgsConstructor
public class UserRepository {

  private static String USER_PREFIX = "USER#";
  private static String PROFILE = "PROFILE";
  private static String PREFERENCES = "PREFERENCES";
  private static String TABLE_NAME = "SchullerSoftwareServices";

  private DynamoDbClient dynamoDbClient;

  public UserProfile getUserProfile(String user) {
    Map<String, AttributeValue> item =
        dynamoDbClient
            .getItem(
                GetItemRequest.builder()
                    .tableName(TABLE_NAME)
                    .key(Map.of("PK", av(USER_PREFIX + user), "SK", av(PROFILE)))
                    .build())
            .item();
    if (item.isEmpty()) {
      return null;
    }
    return UserProfile.builder().theme(item.get("theme").s()).build();
  }

  public UserPreferences getUserPreferences(String user) {
    Map<String, AttributeValue> item =
        dynamoDbClient
            .getItem(
                GetItemRequest.builder()
                    .tableName(TABLE_NAME)
                    .key(Map.of("PK", av(USER_PREFIX + user), "SK", av(PREFERENCES)))
                    .build())
            .item();
    if (item.isEmpty()) {
      return null;
    }
    return new UserPreferences(item.get("enableParticles").bool(), null);
  }

  public UserPreferences updatePreferences(String user, UserPreferences preferences) {
    Map<String, String> names = new HashMap<>();
    Map<String, AttributeValue> values = new HashMap<>();
    List<String> parts = new ArrayList<>();

    if (preferences.enableParticles() != null) {
      parts.add("#enableParticles = :enableParticles");
      names.put("#enableParticles", "enableParticles");
      values.put(
          ":enableParticles", AttributeValue.builder().bool(preferences.enableParticles()).build());
    }
    if (preferences.theme() != null) {
      parts.add("#theme = :theme");
      names.put("#theme", "theme");
      values.put(":theme", AttributeValue.builder().s(preferences.theme()).build());
    }

    if (parts.isEmpty()) return preferences;

    UpdateItemResponse response =
        dynamoDbClient.updateItem(
            UpdateItemRequest.builder()
                .tableName(TABLE_NAME)
                .key(Map.of("PK", av(USER_PREFIX + user), "SK", av(PREFERENCES)))
                .updateExpression("SET " + String.join(", ", parts))
                .expressionAttributeNames(names)
                .expressionAttributeValues(values)
                .returnValues(ReturnValue.ALL_NEW)
                .build());

    Map<String, AttributeValue> item = response.attributes();
    return new UserPreferences(
        item.containsKey("enableParticles") ? item.get("enableParticles").bool() : null,
        item.containsKey("theme") ? item.get("theme").s() : null);
  }

  public void setEnableParticles(String user, boolean enableParticles) {
    dynamoDbClient.updateItem(
        UpdateItemRequest.builder()
            .tableName(TABLE_NAME)
            .key(Map.of("PK", av(USER_PREFIX + user), "SK", av(PREFERENCES)))
            .updateExpression("SET enableParticles = :val")
            .expressionAttributeValues(
                Map.of(":val", AttributeValue.builder().bool(enableParticles).build()))
            .build());
  }

  private static AttributeValue av(String s) {
    return AttributeValue.builder().s(s).build();
  }
}
