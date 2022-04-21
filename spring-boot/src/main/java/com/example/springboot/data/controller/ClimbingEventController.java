package com.example.springboot.data.controller;

import com.example.springboot.data.entity.ClimbingEvent;
import com.example.springboot.data.entity.EventComment;
import com.example.springboot.data.handler.ClimbingEventHandler;
import com.example.springboot.data.handler.EventCommentHandler;
import com.example.springboot.data.model.ClimbingEventModel;
import com.example.springboot.data.model.EventCommentModel;
import com.example.springboot.data.model.UserInfoModel;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(path = "/climbing-events")
public class ClimbingEventController {

    private ClimbingEventHandler climbingEventHandler;

    private EventCommentHandler eventCommentHandler;

    private SimpMessagingTemplate template;

    public ClimbingEventController(ClimbingEventHandler climbingEventHandler, EventCommentHandler eventCommentHandler, SimpMessagingTemplate template) {
        this.climbingEventHandler = climbingEventHandler;
        this.eventCommentHandler = eventCommentHandler;
        this.template = template;
    }

    @GetMapping("/{inactive}")
    public ResponseEntity<List<ClimbingEvent>> getAllEvents(@PathVariable("inactive") boolean inactive) {
        return ResponseEntity.ok(climbingEventHandler.getAllEvents(inactive));
    }

    @PostMapping("/climbing-event")
    public ResponseEntity<String> createEvent(Authentication authentication, @RequestBody ClimbingEventModel eventModel) {
        return ResponseEntity.ok(climbingEventHandler.createEvent(authentication.getName(), eventModel));
    }

    @PostMapping("/climbing-event/comment")
    public ResponseEntity<String> createComment(Authentication authentication, @RequestBody EventCommentModel eventCommentModel) {
        String result = eventCommentHandler.createComment(authentication.getName(), eventCommentModel);
        return ResponseEntity.ok(result);
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/public")
    public String sendMessage(@Payload String chatMessage) {
        return chatMessage;
    }


    @GetMapping("/climbing-event/{eventId}/users")
    public ResponseEntity<List<UserInfoModel>> getUsersForEvent(@PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(climbingEventHandler.getUsersForEvent(eventId));
    }

    @PostMapping("/climbing-event/{eventId}/user")
    public ResponseEntity<String> addUserForEvent(Authentication authentication, @PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(climbingEventHandler.addUserToEvent(authentication.getName(), eventId));
    }

    @GetMapping("/climbing-event/{eventId}/comments")
    public ResponseEntity<List<EventComment>> getCommentsForEvent(@PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(eventCommentHandler.getCommentsForEvent(eventId));
    }

    @GetMapping("climbing-event/{eventId}")
    public ResponseEntity<ClimbingEvent> getEventById(@PathVariable("eventId") Long eventId) {
        return ResponseEntity.ok(climbingEventHandler.getEventById(eventId));
    }
}
