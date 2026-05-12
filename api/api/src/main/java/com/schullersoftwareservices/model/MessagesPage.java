package com.schullersoftwareservices.model;

import io.micronaut.serde.annotation.Serdeable;
import java.util.List;

@Serdeable
public record MessagesPage(List<Message> messages, String nextCursor) {}
