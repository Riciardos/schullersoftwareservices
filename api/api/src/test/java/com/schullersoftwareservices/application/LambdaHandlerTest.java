package com.schullersoftwareservices.application;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

class LambdaHandlerTest {

  // Must match handler in infra/lambda.tf
  private static final String HANDLER =
      "io.micronaut.function.aws.proxy.payload1.ApiGatewayProxyRequestEventFunction";

  @Test
  void lambdaHandlerClassExists() throws ClassNotFoundException {
    Class<?> handlerClass = Class.forName(HANDLER);
    assertNotNull(handlerClass);
  }
}
