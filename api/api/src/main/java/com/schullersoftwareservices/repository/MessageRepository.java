package com.schullersoftwareservices.repository;

import com.schullersoftwareservices.model.Message;
import com.schullersoftwareservices.model.MessageBody;
import io.micronaut.core.annotation.Introspected;
import jakarta.inject.Inject;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;
import software.amazon.awssdk.services.dynamodb.model.ScanRequest;
import software.amazon.awssdk.services.dynamodb.model.ScanResponse;

@Introspected
public class MessageRepository {

  private static final String TABLE_NAME = "SchullerSoftwareServices";
  private static final String PK = "PK";
  private static final String SK = "SK";
  private static final String DATETIME = "DateTime";
  private static final String MESSAGE = "Message";
  private static final String OWNER = "Owner";

  @Inject private DynamoDbClient dynamoDbClient;

  public Message putMessage(MessageBody messageBody, String owner) {
    Message message =
        new Message(UUID.randomUUID(), owner, messageBody.message(), LocalDateTime.now());
    dynamoDbClient.putItem(
        PutItemRequest.builder().tableName(TABLE_NAME).item(toMap(message)).build());
    return message;
  }

  public List<Message> getDayMessages(String date) {
    QueryResponse response =
        dynamoDbClient.query(
            QueryRequest.builder()
                .tableName(TABLE_NAME)
                .keyConditionExpression("#d = :v_date")
                .expressionAttributeNames(Map.of("#d", "Date"))
                .expressionAttributeValues(
                    Map.of(":v_date", AttributeValue.builder().s(date).build()))
                .build());
    return response.items().stream().map(this::fromMap).collect(Collectors.toList());
  }

  public List<Message> getAllMessages() {
    ScanResponse response =
        dynamoDbClient.scan(ScanRequest.builder().tableName(TABLE_NAME).build());
    return response.items().stream().map(this::fromMap).collect(Collectors.toList());
  }

  private Message fromMap(Map<String, AttributeValue> values) {
    return new Message(
        UUID.fromString(values.get(PK).s()),
        values.get(OWNER).s(),
        values.get(MESSAGE).s(),
        LocalDateTime.parse(values.get(DATETIME).s()));
  }

  private Map<String, AttributeValue> toMap(Message message) {
    return Map.of(
        PK, AttributeValue.builder().s(message.uuid().toString()).build(),
        SK, AttributeValue.builder().s(message.dateTime().toLocalDate().toString()).build(),
        DATETIME, AttributeValue.builder().s(message.dateTime().toString()).build(),
        MESSAGE, AttributeValue.builder().s(message.message()).build(),
        OWNER, AttributeValue.builder().s(message.owner()).build());
  }
}
