package com.schullersoftwareservices.config;

import io.micronaut.context.annotation.Bean;
import io.micronaut.context.annotation.Factory;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.dynamodb.DynamoDbAsyncClient;
import software.amazon.awssdk.services.dynamodb.DynamoDbClient;

@Factory
public class Config {

	@Bean
	DynamoDbAsyncClient dynamoDbAsyncClient() {
		return DynamoDbAsyncClient.builder().build();
	}

	@Bean
	DynamoDbClient dynamoDbClient() {
		return DynamoDbClient.builder().region(Region.EU_CENTRAL_1).build();
	}
}
