package com.schullersoftwareservices.controller;

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
	public String getHello(String name)
	{
		return "Hello " + name;
	}

	@Get("/secured/greeting")
	@Secured(SecurityRule.IS_AUTHENTICATED)
	public String getSecuredGreeting(Authentication authentication) {

		return String.format("Hello %s, your email is: %s", authentication.getAttributes().get("name"), authentication.getAttributes().get("email"));
	}

	@Post("/greeting")
	@Secured(SecurityRule.IS_ANONYMOUS)
	public String postGreeting(@Body Name name) {
		return "Hello " + name.getName();
	}
}
