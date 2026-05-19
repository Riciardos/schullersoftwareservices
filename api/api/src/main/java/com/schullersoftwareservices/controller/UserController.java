package com.schullersoftwareservices.controller;

import com.schullersoftwareservices.model.user.UserPreferences;
import com.schullersoftwareservices.repository.UserRepository;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Put;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import lombok.AllArgsConstructor;

@Controller("/user")
@Secured(SecurityRule.IS_AUTHENTICATED)
@AllArgsConstructor
public class UserController {

  private final UserRepository userRepository;

  @Get("/preferences")
  public UserPreferences getUserPreferences(Authentication authentication) {

    return userRepository.getUserPreferences(authentication.getName());
  }

  @Put("/preferences")
  public UserPreferences setUserPreferences(
      Authentication authentication, @Body UserPreferences userPreferences) {
    return userRepository.updatePreferences(authentication.getName(), userPreferences);
  }
}
