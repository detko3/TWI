package com.example.springboot.data;

//import com.example.springboot.data.entity.User;
import com.example.springboot.data.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import java.util.ArrayList;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private UserRepository userRepository;

    public UserDetailsServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("{" + username + "}");
        return userRepository.findByUsernameAndPassword(username, "")
                .map(user -> new User(user.getUsername(),
                        user.getPassword(),
                        new ArrayList<>()))
                .orElseThrow(() -> new EntityExistsException("User " + username + " doesn't exist in database"));
    }
}

