package com.example.springboot.data.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public String sendMessage(@Payload String chatMessage) {
        return chatMessage;
    }
}
