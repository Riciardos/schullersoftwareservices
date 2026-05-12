package com.schullersoftwareservices.model;

import io.micronaut.serde.annotation.Serdeable;
import java.time.LocalDateTime;
import java.util.UUID;

@Serdeable
public record Message(UUID uuid, String owner, String message, LocalDateTime dateTime) {}
