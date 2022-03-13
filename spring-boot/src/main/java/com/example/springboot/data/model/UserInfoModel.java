package com.example.springboot.data.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInfoModel {
    private String username;
    private String role;
    private String fullName;
    private String info;
}
