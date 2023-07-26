package com.schullersoftwareservices.controller;

import static java.lang.Thread.sleep;

import com.schullersoftwareservices.model.Greeting;
import com.schullersoftwareservices.model.Name;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;

@Controller
public class GreetingController {

  @Get("/{name}")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public String getHello(String name) {
    return "Hello " + name;
  }

  @Get("/slow/{name}")
  public String getSlowHello(String name) throws InterruptedException {
    sleep(1000);
    return "Hello " + name;
  }

  @Post("/greeting")
  @Secured(SecurityRule.IS_ANONYMOUS)
  public Greeting postGreeting(@Body Name name) {
    return Greeting.builder().message("Hello " + name.getName()).build();
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
