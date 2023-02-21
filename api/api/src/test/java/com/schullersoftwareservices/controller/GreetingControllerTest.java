package com.schullersoftwareservices.controller;

import static org.junit.jupiter.api.Assertions.*;

import com.schullersoftwareservices.model.Name;
import com.schullersoftwareservices.repository.MessageRepository;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import java.util.Map;
import org.junit.jupiter.api.Test;
@MicronautTest
class GreetingControllerTest {

	@Inject
	GreetingController greetingController;

	@Test
	void getHello() {
		String result = greetingController.getHello("Ricardo");
		assertEquals("Hello Ricardo", result);
	}

	@Test
	void getSecuredGreeting() {
		Authentication authentication = Authentication.build("Ricardo", Map.of("name", "Ricardo", "email", "test@gmail.com"));
		String result = greetingController.getSecuredGreeting(authentication);
		assertEquals("Hello Ricardo, your email is: test@gmail.com", result);
	}

	@Test
	void postGreeting() {
		Name name = new Name();
		name.setName("Ricardo");
		String result = greetingController.postGreeting(name);
		assertEquals("Hello Ricardo", result);
	}
}
