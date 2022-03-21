package com.example.springboot.data.model;

import com.example.springboot.data.entity.ClimbingRoute;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoModel {
    private String username;
    private String role;
    private String fullName;
    private String info;
    private Set<ClimbingRoute> routes;
}
