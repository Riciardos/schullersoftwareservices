package com.schullersoftwareservices.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
import io.micronaut.function.aws.proxy.MockLambdaContext;
import io.micronaut.function.aws.proxy.payload2.APIGatewayV2HTTPEventFunction;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class UserControllerTest {

  static APIGatewayV2HTTPEventFunction handler;
  static MockLambdaContext lambdaContext = new MockLambdaContext();

  @BeforeAll
  static void setup() {
    handler = new APIGatewayV2HTTPEventFunction();
  }

  @AfterAll
  static void cleanup() {
    handler.getApplicationContext().close();
  }

  @Test
  void getPreferencesWithoutAuthReturns401() {
    APIGatewayV2HTTPResponse response =
        handler.handleRequest(buildRequest("GET", "/user/preferences"), lambdaContext);
    assertEquals(401, response.getStatusCode());
  }

  @Test
  void putPreferencesWithoutAuthReturns401() {
    APIGatewayV2HTTPResponse response =
        handler.handleRequest(buildRequest("PUT", "/user/preferences"), lambdaContext);
    assertEquals(401, response.getStatusCode());
  }

  private static APIGatewayV2HTTPEvent buildRequest(String method, String path) {
    APIGatewayV2HTTPEvent.RequestContext.Http http =
        new APIGatewayV2HTTPEvent.RequestContext.Http();
    http.setMethod(method);
    http.setPath(path);

    APIGatewayV2HTTPEvent.RequestContext context = new APIGatewayV2HTTPEvent.RequestContext();
    context.setHttp(http);

    APIGatewayV2HTTPEvent request = new APIGatewayV2HTTPEvent();
    request.setRequestContext(context);
    return request;
  }
}
