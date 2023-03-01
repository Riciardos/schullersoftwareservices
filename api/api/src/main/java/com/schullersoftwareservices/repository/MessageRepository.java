package com.schullersoftwareservices.repository;

import com.schullersoftwareservices.model.Message;
import com.schullersoftwareservices.model.MessageBody;
import io.micronaut.core.annotation.Introspected;
import jakarta.inject.Inject;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

@Introspected
public class MessageRepository {

  static final String TABLE_NAME = "SchullerSoftwareServices";

  @Inject private DynamoDbClient dynamoDbClient;

  public Message putMessage(MessageBody messageBody, String owner) {
    Message message =
        Message.builder()
            .uuid(UUID.randomUUID())
            .message(messageBody.getMessage())
            .owner(owner)
            .date(LocalDate.now())
            .dateTime(LocalDateTime.now())
            .build();
    dynamoDbClient.putItem(
        PutItemRequest.builder().tableName(TABLE_NAME).item(Message.toMap(message)).build());
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

    return response.items().stream().map(Message::fromMap).collect(Collectors.toList());
  }

  public List<Message> getAllMessages() {
    ScanRequest scanRequest = ScanRequest.builder().tableName(TABLE_NAME).build();
    ScanResponse response = dynamoDbClient.scan(scanRequest);
    return response.items().stream().map(Message::fromMap).collect(Collectors.toList());
  }
}
