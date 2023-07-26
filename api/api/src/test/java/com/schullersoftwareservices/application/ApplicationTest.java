package com.schullersoftwareservices.application;

import static org.junit.jupiter.api.Assertions.assertEquals;

import io.micronaut.http.HttpRequest;
import io.micronaut.http.client.HttpClient;
import io.micronaut.http.client.annotation.Client;
import io.micronaut.runtime.EmbeddedApplication;
import io.micronaut.runtime.server.EmbeddedServer;
import io.micronaut.test.extensions.junit5.annotation.MicronautTest;
import jakarta.inject.Inject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

@MicronautTest
class ApplicationTest {

  @Inject EmbeddedApplication<?> application;

  @Inject EmbeddedServer embeddedServer;

  @Inject
  @Client("/")
  HttpClient client;

  @Test
  void testItWorks() {
    Assertions.assertTrue(application.isRunning());
  }

  @Test
  void testServerWorks() {
    Assertions.assertTrue(embeddedServer.isServer());
    final String result = client.toBlocking().retrieve(HttpRequest.GET("/ricardo"), String.class);
    assertEquals(result, "Hello ricardo");
  }
}
