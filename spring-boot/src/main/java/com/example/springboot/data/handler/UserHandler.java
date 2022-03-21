package com.example.springboot.data.handler;

import com.example.springboot.data.entity.ClimbingRoute;
import com.example.springboot.data.entity.User;
import com.example.springboot.data.model.CreateUserModel;
import com.example.springboot.data.model.UserInfoModel;
import com.example.springboot.data.model.UserInfoUpdateModel;
import com.example.springboot.data.repository.ClimbingRouteRepository;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserHandler {

    private final UserRepository userRepository;

    private final ClimbingRouteRepository climbingRouteRepository;

    public UserHandler(UserRepository userRepository, ClimbingRouteRepository climbingRouteRepository) {
        this.userRepository = userRepository;
        this.climbingRouteRepository = climbingRouteRepository;
    }


    public String createUser(CreateUserModel userModel) {
        User existingUser = userRepository.findUserByUsername(userModel.getUsername().toLowerCase());
        if (existingUser != null) {
            return "User already exists";
        }
        if (userModel.getPassword().length() < 8) {
            return "Password has to be at least 8 characters long";
        }
        try {
            User user = new User(userModel.getUsername().toLowerCase(), userModel.getPassword(), "user", "default");
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error ocured while creating user";
        }

        return "Created";
    }

    public UserInfoModel getUserInfo(String username) {
        User user = userRepository.findUserByUsername(username);

        UserInfoModel userInfo = new UserInfoModel();
        userInfo.setUsername(user.getUsername());
        userInfo.setRole(user.getRole());
        userInfo.setFullName(user.getFullName());
        userInfo.setInfo(user.getInfo());
        userInfo.setRoutes(user.getMyRoutes());

        return userInfo;
    }

    public String updateUserInfo(String username, UserInfoUpdateModel userInfoUpdateModel) {
        User user = userRepository.findUserByUsername(username);
        if (userInfoUpdateModel.getFullName().length() == 0) {
            return "Name must be at least 1 character long";
        }
        try {
            user.setFullName(userInfoUpdateModel.getFullName());
            user.setInfo(userInfoUpdateModel.getInfo());
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while updating user info";
        }

        return "Updated";
    }

    public String addRouteToUser(String username, Long routeId) {
        ClimbingRoute route = climbingRouteRepository.findById(routeId).orElse(null);

        if (route == null) {
            return "Route doesn't exists";
        }

        try {
            User user = userRepository.findUserByUsername(username);
            user.addRoute(route);
            userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error while saving route";
        }

        return "Added";
    }
}
