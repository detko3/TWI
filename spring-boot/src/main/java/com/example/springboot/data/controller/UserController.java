package com.example.springboot.data.controller;

import com.example.springboot.data.handler.UserHandler;
import com.example.springboot.data.model.CreateUserModel;
import com.example.springboot.data.model.UserInfoModel;
import com.example.springboot.data.model.UserInfoUpdateModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping(path = "/users")
public class UserController {

    private final UserHandler userHandler;

    public UserController(UserHandler userHandler) {
        this.userHandler = userHandler;
    }

    @PostMapping("/user")
    public ResponseEntity<String> createUser(@RequestBody CreateUserModel userModel) {

        return ResponseEntity.ok(userHandler.createUser(userModel));
    }

    @GetMapping("/user/user-info")
    public ResponseEntity<UserInfoModel> getUserInfo(Authentication authentication) {
        return ResponseEntity.ok(userHandler.getUserInfo(authentication.getName()));
    }

    @PutMapping("user/user-info")
    public ResponseEntity<String> updateUserInfo(Authentication authentication, @RequestBody UserInfoUpdateModel updateModel) {
        return ResponseEntity.ok(userHandler.updateUserInfo(authentication.getName(), updateModel));
    }

    @PostMapping("/user/route/{routeId}")
    public ResponseEntity<String> addRouteForUser(Authentication authentication, @PathVariable("routeId") Long routeId) {
        return ResponseEntity.ok(userHandler.addRouteToUser(authentication.getName(), routeId));
    }
}
