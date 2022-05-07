package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.entity.User;
import com.example.springboot.data.model.ClimbingAreaModel;
import com.example.springboot.data.repository.ClimbingAreaRepository;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClimbingAreaHandler {

    private final ClimbingAreaRepository climbingAreaRepository;

    private final UserRepository userRepository;

    public ClimbingAreaHandler(ClimbingAreaRepository climbingAreaRepository, UserRepository userRepository) {
        this.climbingAreaRepository = climbingAreaRepository;
        this.userRepository = userRepository;
    }

    public List<ClimbingArea> getClimbingAreas() {
        return climbingAreaRepository.findAll();
    }

    public String createClimbingArea(String username, ClimbingAreaModel climbingAreaModel) {
        if (climbingAreaModel.getName().length() == 0) {
            return "Name has to be at least 1 character long";
        }
        try {

            User user = userRepository.findUserByUsername(username);

            ClimbingArea climbingArea = new ClimbingArea(climbingAreaModel.getName(),
                    climbingAreaModel.getLatitude(),
                    climbingAreaModel.getLongitude(), user);
            climbingAreaRepository.save(climbingArea);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while creating climbing area";
        }
        return "Created";
    }

    public ClimbingArea getClimbingAreaById(Long areaId) {
        ClimbingArea area = climbingAreaRepository.findById(areaId).orElse(null);

        if (area == null) {
            throw new NullPointerException("Area with id " + areaId + "  doesn't exists");
        }

        return area;
    }
}
