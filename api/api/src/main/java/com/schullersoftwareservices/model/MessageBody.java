package com.schullersoftwareservices.model;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record MessageBody(String message) {}
