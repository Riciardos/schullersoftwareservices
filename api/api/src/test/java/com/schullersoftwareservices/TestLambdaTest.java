package com.schullersoftwareservices;

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
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import javax.ws.rs.core.MediaType;

class TestLambdaTest {

	static MicronautLambdaHandler handler;
	static Context lambdaContext = new MockLambdaContext();
	static ObjectMapper objectMapper;

	@BeforeAll
	static void setup() {
		try {
			handler = new MicronautLambdaHandler();
			objectMapper = handler.getApplicationContext().getBean(ObjectMapper.class);
		} catch (ContainerInitializationException e ) {
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
		AwsProxyRequest request = new AwsProxyRequestBuilder("/greeting", HttpMethod.POST.toString())
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
				.body(json)
				.build();

		AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
		System.out.println(objectMapper.writeValueAsString(response));
	}


	@Test
	void testGreetingGet() throws Exception {
		String name = "Ricardo";

		AwsProxyRequest request = new AwsProxyRequestBuilder("/" + name, HttpMethod.GET.toString())
				.header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON)
				.build();

		AwsProxyResponse response = handler.handleRequest(request, lambdaContext);
		System.out.println(response.getBody());

	}

}
