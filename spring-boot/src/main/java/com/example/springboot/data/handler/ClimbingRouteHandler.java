package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.entity.ClimbingRoute;
import com.example.springboot.data.entity.User;
import com.example.springboot.data.model.ClimbingRouteModel;
import com.example.springboot.data.model.UserInfoModel;
import com.example.springboot.data.repository.ClimbingAreaRepository;
import com.example.springboot.data.repository.ClimbingRouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ClimbingRouteHandler {

    private ClimbingRouteRepository climbingRouteRepository;

    private ClimbingAreaRepository climbingAreaRepository;

    public ClimbingRouteHandler(ClimbingRouteRepository climbingRouteRepository, ClimbingAreaRepository climbingAreaRepository) {
        this.climbingRouteRepository = climbingRouteRepository;
        this.climbingAreaRepository = climbingAreaRepository;
    }

    public String createClimbingRoute(String username, ClimbingRouteModel climbingRouteModel) {
        if (climbingRouteModel.getName().length() == 0) {
            return "Name has to be at least 1 character long";
        }
        try {
            ClimbingArea area = climbingAreaRepository.findById(climbingRouteModel.getAreaId()).orElse(null);
            if (area == null) {
                return "Climbing area doesn't exists";
            }
            ClimbingRoute route = new ClimbingRoute(climbingRouteModel.getName(), climbingRouteModel.getGrade(), username, climbingRouteModel.getAreaId());
//            route.setArea(area);
            climbingRouteRepository.save(route);
        } catch (Exception e){
            e.printStackTrace();
            return "Error while creating climbing route";
        }
        return "Created";
    }

    public Set<ClimbingRoute> getClimbingRoutesForArea(Long areaId) {
        ClimbingArea area = climbingAreaRepository.findById(areaId).orElse(null);
        if (area == null) {
//            TODO viem sa vratit s null a v response vratit errorMessage
            throw new NullPointerException("Climbing area with Id " + areaId + " doesn't exist");
        }
//        System.out.println(area);
        return area.getRoutes();
    }

    public ClimbingRoute getClimbingRouteById(Long routeId) {
        ClimbingRoute route = climbingRouteRepository.findById(routeId).orElse(null);

        if (route == null) {
            throw new NullPointerException("Route wit id " + routeId + " doesn't exists");
        }

        return route;
    }

    public List<UserInfoModel> getUsersForRoute(Long routeId) {
        ClimbingRoute route = climbingRouteRepository.findById(routeId).orElse(null);

        if (route == null) {
            throw new NullPointerException("Route wit id " + routeId + " doesn't exists");
        }

        Set<User> users = route.getUsers();
        List<UserInfoModel> userModels = new ArrayList<>();
        for (User user: users) {
            UserInfoModel userM = new UserInfoModel();
            userM.setUsername(user.getUsername());
            userM.setRole(user.getRole());
            userM.setFullName(user.getFullName());
            userM.setInfo(user.getInfo());
            userModels.add(userM);
        }
        return userModels;
    }
}
