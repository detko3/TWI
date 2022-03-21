package com.example.springboot;

import com.example.springboot.data.entity.User;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class HelloController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/first")
    @PreAuthorize("hasAuthority('admin')")
    public ResponseEntity<String> index(Authentication authentication) {
//        System.out.println(authentication.getName());
        return  new ResponseEntity<>("Greetings from Spring Boot!", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> allUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

}
