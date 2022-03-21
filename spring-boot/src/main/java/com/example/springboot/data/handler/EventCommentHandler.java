package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingEvent;
import com.example.springboot.data.entity.EventComment;
import com.example.springboot.data.entity.User;
import com.example.springboot.data.model.EventCommentModel;
import com.example.springboot.data.repository.ClimbingEventRepository;
import com.example.springboot.data.repository.EventCommentRepository;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class EventCommentHandler {

    private EventCommentRepository eventCommentRepository;

    private ClimbingEventRepository climbingEventRepository;

    private UserRepository userRepository;

    public EventCommentHandler(EventCommentRepository eventCommentRepository, ClimbingEventRepository climbingEventRepository, UserRepository userRepository) {
        this.eventCommentRepository = eventCommentRepository;
        this.climbingEventRepository = climbingEventRepository;
        this.userRepository = userRepository;
    }

    public String createComment(String username, EventCommentModel model) {
        try {
            ClimbingEvent event = climbingEventRepository.findById(model.getEventId()).orElse(null);
            if (event == null) {
                return "Event doesn't exists";
            }
            User user = userRepository.findUserByUsername(username);

            if (event.getMyGroupUsers().contains(user)) {
                EventComment comment = new EventComment(model.getEventId(), username, new Timestamp(System.currentTimeMillis()), model.getComment());
                eventCommentRepository.save(comment);
            } else {
                return "User is not part of event";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while creating comment";
        }

        return "Created";
    }

    public List<EventComment> getCommentsForEvent(Long eventId) {
        return eventCommentRepository.findEventCommentsByEventOrderByCreatedDate(eventId);
    }
}
