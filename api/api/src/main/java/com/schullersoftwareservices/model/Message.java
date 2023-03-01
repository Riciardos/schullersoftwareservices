package com.schullersoftwareservices.model;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import lombok.Builder;
import lombok.Data;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

@Data
@Builder
public class Message {

  static final String PK = "PK";
  static final String SK = "SK";
  static final String DATE = "Date";
  static final String DATETIME = "DateTime";
  static final String MESSAGE = "Message";
  static final String OWNER = "Owner";
  static final String UUID_STRING = "UUID";

  UUID uuid;
  String owner;
  String message;
  LocalDateTime dateTime;
  LocalDate date;

  public static Message fromMap(Map<String, AttributeValue> values) {
    return Message.builder()
        .date(LocalDate.parse(values.get(SK).s()))
        .dateTime(LocalDateTime.parse(values.get(DATETIME).s()))
        .owner(values.get(OWNER).s())
        .message(values.get(MESSAGE).s())
        .uuid(UUID.fromString(values.get(PK).s()))
        .build();
  }

  public static Map<String, AttributeValue> toMap(Message message) {
    return Map.of(
        PK,
        AttributeValue.builder().s(message.getUuid().toString()).build(),
        SK,
        AttributeValue.builder().s(message.getDate().toString()).build(),
        DATETIME,
        AttributeValue.builder().s(message.getDateTime().toString()).build(),
        MESSAGE,
        AttributeValue.builder().s(message.getMessage()).build(),
        OWNER,
        AttributeValue.builder().s(message.getOwner()).build());
  }
}
