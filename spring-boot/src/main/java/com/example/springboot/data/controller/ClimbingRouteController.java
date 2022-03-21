package com.example.springboot.data.controller;

import com.example.springboot.data.entity.ClimbingRoute;
import com.example.springboot.data.handler.ClimbingRouteHandler;
import com.example.springboot.data.model.ClimbingRouteModel;
import com.example.springboot.data.repository.ClimbingRouteRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping(path = "/climbing-routes")
public class ClimbingRouteController {

    private ClimbingRouteHandler climbingRouteHandler;

    public ClimbingRouteController(ClimbingRouteHandler climbingRouteHandler) {
        this.climbingRouteHandler = climbingRouteHandler;
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/climbing-route")
    public ResponseEntity<String> createClimbingRoute(Authentication authentication, @RequestBody ClimbingRouteModel routeModel) {
        return ResponseEntity.ok(climbingRouteHandler.createClimbingRoute(authentication.getName(), routeModel));
    }

    @GetMapping("/{areaId}")
    public ResponseEntity<Set<ClimbingRoute>> getRoutesForArea(@PathVariable("areaId") Long areaId) {
        return ResponseEntity.ok(climbingRouteHandler.getClimbingRoutesForArea(areaId));
    }

    @GetMapping("/climbing-route/{routeId}")
    public ResponseEntity<ClimbingRoute> getClimbingRoute(@PathVariable("routeId") Long routeId) {
        return ResponseEntity.ok(climbingRouteHandler.getClimbingRouteById(routeId));
    }
}
