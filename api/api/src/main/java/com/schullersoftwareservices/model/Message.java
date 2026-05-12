package com.schullersoftwareservices.model;

import io.micronaut.serde.annotation.Serdeable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import lombok.Builder;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;

@Serdeable
@Builder
public record Message(
    UUID uuid, String owner, String message, LocalDateTime dateTime, LocalDate date) {

  static final String PK = "PK";
  static final String SK = "SK";
  static final String DATE = "Date";
  static final String DATETIME = "DateTime";
  static final String MESSAGE = "Message";
  static final String OWNER = "Owner";
  static final String UUID_STRING = "UUID";

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
        AttributeValue.builder().s(message.uuid().toString()).build(),
        SK,
        AttributeValue.builder().s(message.date().toString()).build(),
        DATETIME,
        AttributeValue.builder().s(message.dateTime().toString()).build(),
        MESSAGE,
        AttributeValue.builder().s(message.message()).build(),
        OWNER,
        AttributeValue.builder().s(message.owner()).build());
  }
}
