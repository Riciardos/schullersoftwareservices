package com.schullersoftwareservices.controller;

import com.schullersoftwareservices.model.Greeting;
import com.schullersoftwareservices.model.Name;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import java.time.Duration;
import java.util.List;
import reactor.core.publisher.Mono;

@Controller
public class GreetingController {

  @Get("/{name}")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public String getHello(String name) {
    return "Hello " + name;
  }

  @Get("/slow/{name}")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public Mono<String> getSlowHello(String name) {
    return Mono.delay(Duration.ofSeconds(1)).map(unused -> "Hello " + name);
  }

  @Get("/testData")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public List<String> getTestData() {
    return List.of("John", "Jane", "Bert", "Ed");
  }

  @Post("/greeting")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public Greeting postGreeting(@Body Name name) {
    return Greeting.builder().message("Hello " + name.name()).build();
  }

  @Get("/secured/greeting")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  public Greeting getSecuredGreeting(Authentication authentication) {

    return Greeting.builder()
        .message(
            String.format(
                "Hello %s, your email is: %s",
                authentication.getAttributes().get("name"),
                authentication.getAttributes().get("email")))
        .build();
  }
}
