package com.example.springboot.data.repository;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.entity.ClimbingRoute;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClimbingRouteRepository extends JpaRepository<ClimbingRoute, Long> {
    ClimbingRoute getClimbingRouteByAreaIdAndName(ClimbingArea area, String name);
}
