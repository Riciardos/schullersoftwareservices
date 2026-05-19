package com.schullersoftwareservices.model.user;

import io.micronaut.serde.annotation.Serdeable;

@Serdeable
public record UserPreferences(Boolean enableParticles, String theme) {}
