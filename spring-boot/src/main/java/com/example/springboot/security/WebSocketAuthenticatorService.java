package com.example.springboot.security;

import com.example.springboot.data.entity.User;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WebSocketAuthenticatorService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authManager;

    public UsernamePasswordAuthenticationToken getAuthenticatedOrFail(String username, String password) throws AuthenticationException {

        // Check the username and password are not empty
        if (username == null || username.trim().isEmpty()) {
            throw new AuthenticationCredentialsNotFoundException("Username was null or empty.");
        }

        if (password == null || password.trim().isEmpty()) {
            throw new AuthenticationCredentialsNotFoundException("Password was null or empty.");
        }

        // Check that the user with that username exists
        User user = userRepository.findByUsernameAndPassword(username.toLowerCase(), password.toLowerCase()).orElse(null) ;

        if(user == null){
            throw new AuthenticationCredentialsNotFoundException("User not found");
        }
        List<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole()));

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                username,
                password,
                authorities
        );

        // verify that the credentials are valid
        authManager.authenticate(token);

        // Erase the password in the token after verifying it because we will pass it to the STOMP headers.
        token.eraseCredentials();

        return token;

    }
}
