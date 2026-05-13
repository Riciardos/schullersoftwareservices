package com.schullersoftwareservices.controller;

import com.schullersoftwareservices.model.Message;
import com.schullersoftwareservices.model.MessageBody;
import com.schullersoftwareservices.model.MessagesPage;
import com.schullersoftwareservices.repository.MessageRepository;
import io.micronaut.core.annotation.Nullable;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.QueryValue;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;
import java.util.List;

@Controller("/messages")
@Secured(SecurityRule.IS_AUTHENTICATED)
public class MessageController {

  @Inject private MessageRepository messageRepository;

  @Post("/post")
  public HttpResponse<Message> postMessage(
      @Body MessageBody messageBody, Authentication authentication) {
    return HttpResponse.accepted()
        .body(messageRepository.putMessage(messageBody, authentication.getName()));
  }

  @Get("/{date}")
  public HttpResponse<List<Message>> getDayMessages(String date) {
    return HttpResponse.accepted().body(messageRepository.getDayMessages(date));
  }

  @Get("/all")
  public HttpResponse<MessagesPage> getAllMessages(@Nullable @QueryValue String cursor) {
    return HttpResponse.accepted().body(messageRepository.getAllMessages(cursor));
  }
}
