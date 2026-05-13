package com.schullersoftwareservices.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyRequestEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayProxyResponseEvent;
import io.micronaut.function.aws.proxy.MockLambdaContext;
import io.micronaut.function.aws.proxy.payload1.ApiGatewayProxyRequestEventFunction;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class ApiGatewayHandlerTest {

  static ApiGatewayProxyRequestEventFunction handler;
  static MockLambdaContext lambdaContext = new MockLambdaContext();

  @BeforeAll
  static void setup() {
    handler = new ApiGatewayProxyRequestEventFunction();
  }

  @AfterAll
  static void cleanup() {
    handler.getApplicationContext().close();
  }

  @Test
  void anonymousEndpointReturns200() {
    APIGatewayProxyResponseEvent response =
        handler.handleRequest(buildRequest("GET", "/ricardo"), lambdaContext);
    assertNotNull(response);
    assertEquals(200, response.getStatusCode());
    assertEquals("Hello ricardo", response.getBody());
  }

  @Test
  void securedEndpointWithoutTokenReturns401() {
    APIGatewayProxyResponseEvent response =
        handler.handleRequest(buildRequest("GET", "/secured/greeting"), lambdaContext);
    assertNotNull(response);
    assertEquals(401, response.getStatusCode());
  }

  private static APIGatewayProxyRequestEvent buildRequest(String method, String path) {
    APIGatewayProxyRequestEvent.ProxyRequestContext context =
        new APIGatewayProxyRequestEvent.ProxyRequestContext();
    context.setStage("test");

    APIGatewayProxyRequestEvent request = new APIGatewayProxyRequestEvent();
    request.setHttpMethod(method);
    request.setPath(path);
    request.setRequestContext(context);
    return request;
  }
}
