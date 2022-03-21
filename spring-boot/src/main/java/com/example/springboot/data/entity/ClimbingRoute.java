package com.example.springboot.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "climbing_route", schema = "public")
public class ClimbingRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "grade", nullable = false)
    private int grade;

    @Column(name = "created_by", nullable = false)
    private String createdBy;

//    @JsonIgnore
//    @ManyToOne
//    @NotFound(action = NotFoundAction.IGNORE)
    @Column(name="area_id", nullable=false)
    private Long areaId;

    @JsonIgnore
    @ManyToMany(mappedBy = "myRoutes")
    private Set<User> users = new HashSet<>();


    public ClimbingRoute() {

    }

    public ClimbingRoute(String name, int grade, String createdBy, Long areaId) {
        this.name = name;
        this.grade = grade;
        this.createdBy = createdBy;
        this.areaId = areaId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public int getGrade() {
        return grade;
    }

    public void setGrade(int grade) {
        this.grade = grade;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Long getArea() {
        return areaId;
    }

    public void setArea(Long area) {
        this.areaId = area;
    }

    public Long getAreaId() {
        return areaId;
    }

    public void setAreaId(Long areaId) {
        this.areaId = areaId;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClimbingRoute that = (ClimbingRoute) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name) && Objects.equals(grade, that.grade) && Objects.equals(createdBy, that.createdBy) && Objects.equals(areaId, that.areaId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, grade, createdBy, areaId);
    }
}
