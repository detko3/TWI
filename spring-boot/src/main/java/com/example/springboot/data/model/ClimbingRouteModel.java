package com.example.springboot.data.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ClimbingRouteModel {
    private String name;
    private int grade;
    private Long areaId;
}
