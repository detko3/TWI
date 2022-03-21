package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.model.ClimbingAreaModel;
import com.example.springboot.data.repository.ClimbingAreaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClimbingAreaHandler {

    private final ClimbingAreaRepository climbingAreaRepository;

    public ClimbingAreaHandler(ClimbingAreaRepository climbingAreaRepository) {
        this.climbingAreaRepository = climbingAreaRepository;
    }

    public List<ClimbingArea> getClimbingAreas() {
        return climbingAreaRepository.findAll();
    }

    public String createClimbingArea(String username, ClimbingAreaModel climbingAreaModel) {
        if (climbingAreaModel.getName().length() == 0) {
            return "Name has to be at least 1 character long";
        }
        try {
            ClimbingArea climbingArea = new ClimbingArea(climbingAreaModel.getName(),
                    climbingAreaModel.getLatitude(),
                    climbingAreaModel.getLongitude(), username);
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
