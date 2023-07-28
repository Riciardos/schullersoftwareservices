package com.schullersoftwareservices.application;

import com.amazonaws.services.lambda.runtime.Context;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micronaut.function.aws.proxy.MockLambdaContext;
import io.micronaut.function.aws.proxy.alb.ApplicationLoadBalancerFunction;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

class TestLambdaTest {

  static ApplicationLoadBalancerFunction handler;
  static Context lambdaContext = new MockLambdaContext();
  static ObjectMapper objectMapper;

  @BeforeAll
  static void setup() {
    try {
      handler = new ApplicationLoadBalancerFunction();
      objectMapper = handler.getApplicationContext().getBean(ObjectMapper.class);
    } catch (Exception e) {
      e.printStackTrace();
    }
  }

  @AfterAll
  static void cleanup() {
    handler.getApplicationContext().close();
  }

  //  @Test
  //  void testGreetingPost() throws Exception {
  //    Name name = new Name();
  //    name.setName("Ricardo");
  //
  //    String json = objectMapper.writeValueAsString(name);
  //    AwsRequest request =
  //        Aw("/greeting", HttpMethod.POST.toString())
  //            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
  //            .body(json)
  //            .build();
  //
  //    AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
  //    assertEquals(200, response.getStatusCode());
  //    assertEquals("{\"message\":\"Hello Ricardo\"}", response.getBody());
  //  }
  //
  //  @Test
  //  void testGreetingGet() throws Exception {
  //    String name = "Ricardo";
  //
  //    AwsProxyRequest request =
  //        new AwsProxyRequestBuilder("/" + name, HttpMethod.GET.toString())
  //            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
  //            .build();
  //
  //    AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
  //    assertEquals(200, response.getStatusCode());
  //    assertEquals("Hello Ricardo", response.getBody());
  //  }
}
