package com.example.springboot.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "climbing_areas", schema = "public")
public class ClimbingArea {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "latitude", nullable = false)
    private Double latitude;

    @Column(name = "longitude", nullable = false)
    private Double longitude;

    @Column(name = "created_by", nullable = false)
    private String createdBy;

//    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "area_id", referencedColumnName = "id")
    @NotFound(action = NotFoundAction.IGNORE)
    private Set<ClimbingRoute> routes = new HashSet<>();

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "area", referencedColumnName = "id")
    private Set<ClimbingEvent> events = new HashSet<>();

    public ClimbingArea() {

    }

    public ClimbingArea(String name, Double latitude, Double longitude, String createdBy) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.createdBy = createdBy;
        this.routes = new HashSet<>();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Set<ClimbingRoute> getRoutes() {
        return routes;
    }

    public void setRoutes(Set<ClimbingRoute> routes) {
        this.routes = routes;
    }

    public Set<ClimbingEvent> getEvents() {
        return events;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClimbingArea that = (ClimbingArea) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(latitude, that.latitude) && Objects.equals(longitude, that.longitude) && Objects.equals(createdBy, that.createdBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, latitude, longitude, createdBy);
    }
}
