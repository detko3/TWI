package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.entity.ClimbingEvent;
import com.example.springboot.data.entity.User;
import com.example.springboot.data.model.ClimbingEventModel;
import com.example.springboot.data.model.UserInfoModel;
import com.example.springboot.data.repository.ClimbingAreaRepository;
import com.example.springboot.data.repository.ClimbingEventRepository;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class ClimbingEventHandler {

    private ClimbingEventRepository climbingEventRepository;

    private ClimbingAreaRepository climbingAreaRepository;

    private UserRepository userRepository;

    public ClimbingEventHandler(ClimbingEventRepository climbingEventRepository, ClimbingAreaRepository climbingAreaRepository, UserRepository userRepository) {
        this.climbingEventRepository = climbingEventRepository;
        this.climbingAreaRepository = climbingAreaRepository;
        this.userRepository = userRepository;
    }

    public List<ClimbingEvent> getAllEvents(boolean inactive) {
        if (inactive) {
            return climbingEventRepository.findAll();
        } else {
//            System.out.println(LocalDate.now());
//            System.out.println(LocalTime.now());
//            return climbingEventRepository.findClimbingEventsByDateGreaterThanEqualAndTimeGreaterThanEqual(LocalDate.now(), LocalTime.now());
            return climbingEventRepository.findClimbingEventsByDateGreaterThanEqual(LocalDate.now());
        }
    }

    public String createEvent(String username, ClimbingEventModel model) {
        try {
            ClimbingArea climbingArea = climbingAreaRepository.findById(model.getArea()).orElse(null);
            if (climbingArea == null) {
                return "Climbing area doesn't exists";
            }

            System.out.println(model.isPrivate());

            ClimbingEvent climbingEvent = new ClimbingEvent(model.getArea(), model.getMinGrade(), model.getMaxGrade(),
                    model.getMaxParticipants(), username, model.getDate(), model.getTime(), model.isPrivate(), model.getDescription());

            User user = userRepository.findUserByUsername(username);

            climbingEvent.addGroupUser(user);

            climbingEventRepository.save(climbingEvent);

        } catch (Exception e) {
            e.printStackTrace();
            return "Error while creating climbing event";
        }

        return "Created";
    }

    public List<UserInfoModel> getUsersForEvent(Long eventId) {
        ClimbingEvent event = climbingEventRepository.findById(eventId).orElse(null);
        if (event == null) {
            return null;
        }

        List<UserInfoModel> result = new ArrayList<>();
        event.getMyGroupUsers().forEach(user -> {
            UserInfoModel userModel = new UserInfoModel();
            userModel.setUsername(user.getUsername());
            userModel.setFullName(user.getFullName());
            userModel.setRole(user.getRole());
            userModel.setInfo(user.getInfo());

            result.add(userModel);
        });
        return result;
    }

    public String addUserToEvent(String username, Long eventId) {
        ClimbingEvent event = climbingEventRepository.findById(eventId).orElse(null);

        if (event == null) {
            return "Event doesn't exists";
        }
        User user = userRepository.findUserByUsername(username);
        event.addGroupUser(user);
        climbingEventRepository.save(event);
        return "Added";
    }

    public ClimbingEvent getEventById(Long eventId) {
        ClimbingEvent event = climbingEventRepository.findById(eventId).orElse(null);

        if (event == null) {
            throw new NullPointerException("Event with id " + eventId + "  doesn't exists");
        }
        return event;
    }
}
