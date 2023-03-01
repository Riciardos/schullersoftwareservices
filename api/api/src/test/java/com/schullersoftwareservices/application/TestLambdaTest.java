package com.schullersoftwareservices.application;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.internal.testutils.AwsProxyRequestBuilder;
import com.amazonaws.serverless.proxy.internal.testutils.MockLambdaContext;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.schullersoftwareservices.model.Name;
import io.micronaut.function.aws.proxy.MicronautLambdaHandler;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpMethod;
import javax.ws.rs.core.MediaType;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class TestLambdaTest {

  static MicronautLambdaHandler handler;
  static Context lambdaContext = new MockLambdaContext();
  static ObjectMapper objectMapper;

  @BeforeAll
  static void setup() {
    try {
      handler = new MicronautLambdaHandler();
      objectMapper = handler.getApplicationContext().getBean(ObjectMapper.class);
    } catch (ContainerInitializationException e) {
      e.printStackTrace();
    }
  }

  @AfterAll
  static void cleanup() {
    handler.getApplicationContext().close();
  }

  @Test
  void testGreetingPost() throws Exception {
    Name name = new Name();
    name.setName("Ricardo");

    String json = objectMapper.writeValueAsString(name);
    AwsProxyRequest request =
        new AwsProxyRequestBuilder("/greeting", HttpMethod.POST.toString())
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(json)
            .build();

    AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
    assertEquals(200, response.getStatusCode());
    assertEquals("{\"message\":\"Hello Ricardo\"}", response.getBody());
  }

  @Test
  void testSecuredGreetingOptions() throws Exception {
    Name name = new Name();
    name.setName("Ricardo");

    String json = objectMapper.writeValueAsString(name);
    AwsProxyRequest request =
        new AwsProxyRequestBuilder("/secured/greeting", HttpMethod.OPTIONS.toString())
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .body(json)
            .build();

    AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
    assertEquals(200, response.getStatusCode());
    assertEquals("{}", response.getBody());
  }

  @Test
  void testGreetingGet() throws Exception {
    String name = "Ricardo";

    AwsProxyRequest request =
        new AwsProxyRequestBuilder("/" + name, HttpMethod.GET.toString())
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
            .build();

    AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
    assertEquals(200, response.getStatusCode());
    assertEquals("Hello Ricardo", response.getBody());
  }
}
