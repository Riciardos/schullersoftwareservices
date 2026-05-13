package com.schullersoftwareservices.config;

import io.micronaut.context.annotation.Replaces;
import io.micronaut.function.aws.proxy.security.MicronautLambdaAuthenticationFetcher;
import io.micronaut.http.HttpRequest;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.filters.AuthenticationFetcher;
import jakarta.inject.Singleton;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Flux;

@Singleton
@Replaces(MicronautLambdaAuthenticationFetcher.class)
public class NoOpLambdaAuthenticationFetcher implements AuthenticationFetcher<HttpRequest<?>> {

  @Override
  public Publisher<Authentication> fetchAuthentication(HttpRequest<?> request) {
    return Flux.empty();
  }
}
