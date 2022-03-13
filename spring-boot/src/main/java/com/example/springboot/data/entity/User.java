package com.example.springboot.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="users", schema = "public")
public class User {

    @Id
    @Column(name = "username", nullable = false)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false)
    private String role;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "info")
    private String info;

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "created_by", referencedColumnName = "username")
    private Set<ClimbingEvent> myEvents = new HashSet<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "myGroupUsers")
    private Set<ClimbingEvent> myGroupEvents = new HashSet<>();

    public User() {

    }

    public User(String username, String password, String role, String fullName) {
        this.username = username;
        this.password = password;
        this.role = role;
        this.fullName = fullName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public Set<ClimbingEvent> getMyEvents() {
        return myEvents;
    }

    public void setMyEvents(Set<ClimbingEvent> myEvents) {
        this.myEvents = myEvents;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof User))
            return false;
        User user = (User) o;
        return Objects.equals(this.username, user.username) && Objects.equals(this.password, user.password)
                && Objects.equals(this.role, user.role) && Objects.equals(this.fullName, user.fullName)
                && Objects.equals(this.info, user.info);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.username, this.password, this.fullName, this.role, this.info);
    }

}

