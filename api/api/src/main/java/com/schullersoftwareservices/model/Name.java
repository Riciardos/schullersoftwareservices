package com.schullersoftwareservices.model;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record Name(String name) {}
