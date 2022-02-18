package com.schullersoftwareservices.controller;

import com.schullersoftwareservices.model.Message;
import com.schullersoftwareservices.model.MessageBody;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller("/messages")
public class MessageController {

  static final String TABLE_NAME = "messages";

  @Inject private DynamoDbClient dynamoDbClient;

  @Post("/post")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public HttpResponse<Message> postMessage(MessageBody messageBody, Authentication authentication) {

    Message message =
        Message.builder()
            .uuid(UUID.randomUUID())
            .message(messageBody.getMessage())
            .owner(authentication.getName())
            .date(LocalDate.now())
            .dateTime(LocalDateTime.now())
            .build();
    dynamoDbClient.putItem(
        PutItemRequest.builder().tableName(TABLE_NAME).item(Message.toMap(message)).build());
    return HttpResponse.accepted().body(message);
  }

  @Get("/{date}")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public HttpResponse<List<Message>> getDayMessages(String date) {
    QueryResponse response =
        dynamoDbClient.query(
            QueryRequest.builder()
                .tableName(TABLE_NAME)
                .keyConditionExpression("#d = :v_date")
                .expressionAttributeNames(Map.of("#d", "Date"))
                .expressionAttributeValues(
                    Map.of(":v_date", AttributeValue.builder().s(date).build()))
                .build());
    return HttpResponse.accepted()
        .body(response.items().stream().map(Message::fromMap).collect(Collectors.toList()));
  }

  @Get("/all")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public HttpResponse<List<Message>> getAllMessages() {
    ScanRequest scanRequest = ScanRequest.builder().tableName(TABLE_NAME).build();
    ScanResponse response = dynamoDbClient.scan(scanRequest);
    List<Message> messages =
        response.items().stream().map(Message::fromMap).collect(Collectors.toList());
    return HttpResponse.accepted().body(messages);
  }
}
