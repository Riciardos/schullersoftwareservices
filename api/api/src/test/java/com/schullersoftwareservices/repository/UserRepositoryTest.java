package com.schullersoftwareservices.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.schullersoftwareservices.model.user.UserPreferences;
import io.micronaut.test.annotation.MockBean;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import java.util.Map;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.GetItemRequest;
import software.amazon.awssdk.services.dynamodb.model.GetItemResponse;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemRequest;
import software.amazon.awssdk.services.dynamodb.model.UpdateItemResponse;

@MicronautTest
class UserRepositoryTest {

  @Inject UserRepository userRepository;
  @Inject DynamoDbClient dynamoDbClient;

  @MockBean(DynamoDbClient.class)
  DynamoDbClient dynamoDbClient() {
    return Mockito.mock(DynamoDbClient.class);
  }

  @Test
  void getUserPreferencesReturnsPreferencesWhenFound() {
    when(dynamoDbClient.getItem(any(GetItemRequest.class)))
        .thenReturn(
            GetItemResponse.builder()
                .item(
                    Map.of(
                        "enableParticles", AttributeValue.builder().bool(true).build(),
                        "theme", AttributeValue.builder().s("dark").build()))
                .build());

    UserPreferences result = userRepository.getUserPreferences("ricardo");

    assertEquals(true, result.enableParticles());
    assertEquals(null, result.theme());
  }

  @Test
  void getUserPreferencesReturnsNullWhenNotFound() {
    when(dynamoDbClient.getItem(any(GetItemRequest.class)))
        .thenReturn(GetItemResponse.builder().build());

    assertNull(userRepository.getUserPreferences("ricardo"));
  }

  @Test
  void updatePreferencesSendsCorrectExpressionForAllFields() {
    when(dynamoDbClient.updateItem(any(UpdateItemRequest.class)))
        .thenReturn(UpdateItemResponse.builder().build());
    ArgumentCaptor<UpdateItemRequest> captor = ArgumentCaptor.forClass(UpdateItemRequest.class);

    userRepository.updatePreferences("ricardo", new UserPreferences(true, "dark"));

    verify(dynamoDbClient).updateItem(captor.capture());
    UpdateItemRequest request = captor.getValue();
    assertTrue(request.updateExpression().contains("#enableParticles"));
    assertTrue(request.updateExpression().contains("#theme"));
    assertTrue(request.expressionAttributeValues().containsKey(":enableParticles"));
    assertTrue(request.expressionAttributeValues().containsKey(":theme"));
  }

  @Test
  void updatePreferencesSkipsNullFields() {
    when(dynamoDbClient.updateItem(any(UpdateItemRequest.class)))
        .thenReturn(UpdateItemResponse.builder().build());
    ArgumentCaptor<UpdateItemRequest> captor = ArgumentCaptor.forClass(UpdateItemRequest.class);

    userRepository.updatePreferences("ricardo", new UserPreferences(null, "dark"));

    verify(dynamoDbClient).updateItem(captor.capture());
    UpdateItemRequest request = captor.getValue();
    assertTrue(request.updateExpression().contains("#theme"));
    assertTrue(!request.updateExpression().contains("#enableParticles"));
  }

  @Test
  void updatePreferencesDoesNothingWhenAllFieldsNull() {
    userRepository.updatePreferences("ricardo", new UserPreferences(null, null));

    verify(dynamoDbClient, never()).updateItem(any(UpdateItemRequest.class));
  }
}
