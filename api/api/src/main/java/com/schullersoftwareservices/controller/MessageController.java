package com.schullersoftwareservices.controller;

import com.schullersoftwareservices.model.Message;
import com.schullersoftwareservices.model.MessageBody;
import com.schullersoftwareservices.repository.MessageRepository;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.security.annotation.Secured;
import io.micronaut.security.authentication.Authentication;
import io.micronaut.security.rules.SecurityRule;
import jakarta.inject.Inject;
import java.util.List;

@Controller("/messages")
public class MessageController {

  @Inject private MessageRepository messageRepository;

  @Post("/post")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  public HttpResponse<Message> postMessage(MessageBody messageBody, Authentication authentication) {

    return HttpResponse.accepted()
        .body(messageRepository.putMessage(messageBody, authentication.getName()));
  }

  @Get("/{date}")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  public HttpResponse<List<Message>> getDayMessages(String date) {
    return HttpResponse.accepted().body(messageRepository.getDayMessages(date));
  }

  @Get("/all")
  @Secured(SecurityRule.IS_AUTHENTICATED)
  public HttpResponse<List<Message>> getAllMessages() {

    return HttpResponse.accepted().body(messageRepository.getAllMessages());
  }
}
