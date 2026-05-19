package com.schullersoftwareservices.repository;

import com.schullersoftwareservices.model.Message;
import com.schullersoftwareservices.model.MessageBody;
import com.schullersoftwareservices.model.MessagesPage;
import jakarta.inject.Singleton;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import lombok.AllArgsConstructor;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;
import software.amazon.awssdk.services.dynamodb.model.AttributeValue;
import software.amazon.awssdk.services.dynamodb.model.PutItemRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryRequest;
import software.amazon.awssdk.services.dynamodb.model.QueryResponse;

@Singleton
@AllArgsConstructor
public class MessageRepository {

  private static final String TABLE_NAME = "SchullerSoftwareServices";
  private static final String PK = "PK";
  private static final String SK = "SK";
  private static final String DATETIME = "DateTime";
  private static final String MESSAGE = "Message";
  private static final String OWNER = "Owner";
  private static final String SHARD_PREFIX = "MESSAGES#";
  private static final int DEFAULT_PAGE_SIZE = 20;
  private static final int MAX_MONTHS_LOOKBACK = 24;

  private final DynamoDbClient dynamoDbClient;

  public Message putMessage(MessageBody messageBody, String owner) {
    LocalDateTime now = LocalDateTime.now(ZoneOffset.UTC);
    Message message = new Message(UUID.randomUUID(), owner, messageBody.message(), now);
    dynamoDbClient.putItem(
        PutItemRequest.builder().tableName(TABLE_NAME).item(toMap(message)).build());
    return message;
  }

  public List<Message> getDayMessages(String date) {
    String shard = SHARD_PREFIX + date.substring(0, 7);
    QueryResponse response =
        dynamoDbClient.query(
            QueryRequest.builder()
                .tableName(TABLE_NAME)
                .keyConditionExpression("#pk = :pk AND begins_with(#sk, :date)")
                .expressionAttributeNames(Map.of("#pk", PK, "#sk", SK))
                .expressionAttributeValues(Map.of(":pk", av(shard), ":date", av(date + "T")))
                .scanIndexForward(false)
                .build());
    return response.items().stream().map(this::fromMap).toList();
  }

  public MessagesPage getAllMessages(String cursor) {
    String shard;
    Map<String, AttributeValue> exclusiveStartKey = null;

    if (cursor == null) {
      shard = currentShard();
    } else {
      CursorData data = decodeCursor(cursor);
      shard = data.shard();
      exclusiveStartKey = data.lastKey();
    }

    List<Message> messages = new ArrayList<>();
    String nextCursor = null;
    String lastQueriedShard = shard;
    boolean lastShardExhausted = false;

    while (messages.size() < DEFAULT_PAGE_SIZE) {
      lastQueriedShard = shard;
      int remaining = DEFAULT_PAGE_SIZE - messages.size();

      QueryRequest.Builder qb =
          QueryRequest.builder()
              .tableName(TABLE_NAME)
              .keyConditionExpression("#pk = :pk")
              .expressionAttributeNames(Map.of("#pk", PK))
              .expressionAttributeValues(Map.of(":pk", av(shard)))
              .scanIndexForward(false)
              .limit(remaining);
      if (exclusiveStartKey != null) qb.exclusiveStartKey(exclusiveStartKey);

      QueryResponse resp = dynamoDbClient.query(qb.build());
      messages.addAll(resp.items().stream().map(this::fromMap).toList());

      if (!resp.lastEvaluatedKey().isEmpty()) {
        nextCursor = encodeCursor(shard, resp.lastEvaluatedKey().get(SK).s());
        lastShardExhausted = false;
        break;
      }

      lastShardExhausted = true;
      String prev = previousShard(shard);
      if (prev == null) break;
      shard = prev;
      exclusiveStartKey = null;
    }

    // If page filled exactly when a shard was exhausted, older shards may still have items
    if (nextCursor == null && lastShardExhausted && messages.size() == DEFAULT_PAGE_SIZE) {
      String prev = previousShard(lastQueriedShard);
      if (prev != null) nextCursor = encodeCursor(prev, null);
    }

    return new MessagesPage(messages, nextCursor);
  }

  private Message fromMap(Map<String, AttributeValue> values) {
    String sk = values.get(SK).s();
    UUID uuid = UUID.fromString(sk.substring(sk.lastIndexOf('#') + 1));
    return new Message(
        uuid,
        values.get(OWNER).s(),
        values.get(MESSAGE).s(),
        LocalDateTime.parse(values.get(DATETIME).s()));
  }

  private Map<String, AttributeValue> toMap(Message message) {
    String shard = SHARD_PREFIX + YearMonth.from(message.dateTime());
    String sk = message.dateTime() + "#" + message.uuid();
    return Map.of(
        PK, av(shard),
        SK, av(sk),
        DATETIME, av(message.dateTime().toString()),
        MESSAGE, av(message.message()),
        OWNER, av(message.owner()));
  }

  private String currentShard() {
    return SHARD_PREFIX + YearMonth.now();
  }

  private String previousShard(String shard) {
    YearMonth ym = YearMonth.parse(shard.substring(SHARD_PREFIX.length()));
    YearMonth prev = ym.minusMonths(1);
    if (prev.isBefore(YearMonth.now().minusMonths(MAX_MONTHS_LOOKBACK))) return null;
    return SHARD_PREFIX + prev;
  }

  private String encodeCursor(String shard, String sk) {
    String raw = sk == null ? shard : shard + "|" + sk;
    return Base64.getEncoder().encodeToString(raw.getBytes());
  }

  private CursorData decodeCursor(String cursor) {
    String raw = new String(Base64.getDecoder().decode(cursor));
    int sep = raw.indexOf('|');
    if (sep == -1) return new CursorData(raw, null);
    String shard = raw.substring(0, sep);
    String sk = raw.substring(sep + 1);
    return new CursorData(shard, Map.of(PK, av(shard), SK, av(sk)));
  }

  private static AttributeValue av(String s) {
    return AttributeValue.builder().s(s).build();
  }

  private record CursorData(String shard, Map<String, AttributeValue> lastKey) {}
}
