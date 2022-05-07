package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.entity.ClimbingRoute;
import com.example.springboot.data.entity.User;
import com.example.springboot.data.model.ClimbingRouteModel;
import com.example.springboot.data.model.UserInfoModel;
import com.example.springboot.data.repository.ClimbingAreaRepository;
import com.example.springboot.data.repository.ClimbingRouteRepository;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ClimbingRouteHandler {

    private ClimbingRouteRepository climbingRouteRepository;

    private ClimbingAreaRepository climbingAreaRepository;

    private UserRepository userRepository;

    public ClimbingRouteHandler(ClimbingRouteRepository climbingRouteRepository, ClimbingAreaRepository climbingAreaRepository, UserRepository userRepository) {
        this.climbingRouteRepository = climbingRouteRepository;
        this.climbingAreaRepository = climbingAreaRepository;
        this.userRepository = userRepository;
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

            ClimbingRoute existingRoute = climbingRouteRepository.getClimbingRouteByAreaIdAndName(area, climbingRouteModel.getName());
            if (existingRoute != null) {
                return "Climbing route already exists in area";
            }
            User user = userRepository.findUserByUsername(username);
            ClimbingRoute route = new ClimbingRoute(climbingRouteModel.getName(), climbingRouteModel.getGrade(), user, area);
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
