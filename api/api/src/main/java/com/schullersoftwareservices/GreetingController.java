package com.schullersoftwareservices;

import com.schullersoftwareservices.model.Name;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;

@Controller
public class GreetingController {

	@Get("/{name}")
	public String getGreeting(String name) {

		return "Hello " + name;
	}

	@Post("/greeting")
	public String postGreeting(@Body Name name) {
		return "Hello " + name.getName();
	}
}
