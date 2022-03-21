package com.example.springboot.data.controller;

import com.example.springboot.data.entity.ClimbingArea;
import com.example.springboot.data.handler.ClimbingAreaHandler;
import com.example.springboot.data.model.ClimbingAreaModel;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/climbing-areas")
public class ClimbingAreaController {

    private final ClimbingAreaHandler climbingAreaHandler;

    public ClimbingAreaController(ClimbingAreaHandler climbingAreaHandler) {
        this.climbingAreaHandler = climbingAreaHandler;
    }

    @GetMapping()
    public ResponseEntity<List<ClimbingArea>> getClimbingAreas() {
        return ResponseEntity.ok(climbingAreaHandler.getClimbingAreas());
    }

    @PreAuthorize("hasAuthority('admin')")
    @PostMapping("/climbing-area")
    public ResponseEntity<String> createClimbingArea(Authentication authentication, @RequestBody ClimbingAreaModel areaModel) {
        return ResponseEntity.ok(climbingAreaHandler.createClimbingArea(authentication.getName(), areaModel));
    }

    @GetMapping("/climbing-area/{areaId}")
    public ResponseEntity<ClimbingArea> getClimbingArea(@PathVariable("areaId") Long areaId) {
        return ResponseEntity.ok(climbingAreaHandler.getClimbingAreaById(areaId));
    }

}
