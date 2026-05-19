package com.schullersoftwareservices.model.user;

import io.micronaut.serde.annotation.Serdeable;
import lombok.Builder;
import lombok.Value;

@Serdeable
@Value
@Builder
public class UserProfile {
  String theme;
}
