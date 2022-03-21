package com.example.springboot.data.repository;

import com.example.springboot.data.entity.ClimbingEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface ClimbingEventRepository extends JpaRepository<ClimbingEvent, Long> {
    List<ClimbingEvent> findClimbingEventsByDateGreaterThanEqualAndTimeGreaterThanEqual(LocalDate date, LocalTime time);
    List<ClimbingEvent> findClimbingEventsByDateGreaterThanEqual(LocalDate date);
}
