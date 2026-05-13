package com.schullersoftwareservices.application;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPEvent;
import com.amazonaws.services.lambda.runtime.events.APIGatewayV2HTTPResponse;
import io.micronaut.function.aws.proxy.MockLambdaContext;
import io.micronaut.function.aws.proxy.payload2.APIGatewayV2HTTPEventFunction;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

class ApiGatewayHandlerTest {

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
  void anonymousEndpointReturns200() {
    APIGatewayV2HTTPResponse response =
        handler.handleRequest(buildRequest("GET", "/ricardo"), lambdaContext);
    assertNotNull(response);
    assertEquals(200, response.getStatusCode());
    assertEquals("Hello ricardo", response.getBody());
  }

  @Test
  void securedEndpointWithoutTokenReturns401() {
    APIGatewayV2HTTPResponse response =
        handler.handleRequest(buildRequest("GET", "/secured/greeting"), lambdaContext);
    assertNotNull(response);
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
