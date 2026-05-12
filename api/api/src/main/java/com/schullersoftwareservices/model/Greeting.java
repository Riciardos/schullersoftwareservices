package com.schullersoftwareservices.model;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;

@Serdeable
@Builder
public record Greeting(String message) {}
