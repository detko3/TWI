package com.example.springboot.data.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class ClimbingEventModel {
    private Long area;
    private int minGrade;
    private int maxGrade;
    private int maxParticipants;
    private LocalDate date;
    private LocalTime time;
    private boolean isPrivate;
    private String description;
}
