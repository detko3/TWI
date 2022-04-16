package com.example.springboot.data.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


@Entity
@Table(name = "climbing_event", schema = "public")
public class ClimbingEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "area", nullable = false)
    private Long area;

    @Column(name = "min_grade")
    private int minGrade;

    @Column(name = "max_grade")
    private int maxGrade;

    @Column(name = "max_participants")
    private Integer maxParticipants;

    @Column(name = "created_by", nullable = false)
    private String createdBy;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Column(name = "is_private", nullable = false)
    private boolean isPrivate;

    @Column(name = "is_canceled", nullable = false)
    private boolean isCanceled;

    @Column(name = "description")
    private String description;

//    @JsonIgnore
    @ManyToMany
    @JoinTable(name = "user_event_group", joinColumns = @JoinColumn(name = "event_id"), inverseJoinColumns = @JoinColumn(name = "username"))
    private Set<User> myGroupUsers = new HashSet<>();

    @JsonIgnore
    @OneToMany
    @JoinColumn(name = "event", referencedColumnName = "id")
    private Set<EventComment> comments = new HashSet<>();

    public ClimbingEvent() {

    }

    public ClimbingEvent(Long area, int minGrade, int maxGrade, int maxParticipants, String createdBy, LocalDate date, LocalTime time, boolean isPrivate, String description) {
        this.area = area;
        this.minGrade = minGrade;
        this.maxGrade = maxGrade;
        this.maxParticipants = maxParticipants;
        this.createdBy = createdBy;
        this.date = date;
        this.time = time;
        this.isPrivate = isPrivate;
        this.isCanceled = false;
        this.description = description;
    }

    public void addGroupUser(User user) {
        myGroupUsers.add(user);
        user.getMyGroupEvents().add(this);
    }

    public void removeGroupUser(User user) {
        myGroupUsers.remove(user);
        user.getMyGroupEvents().remove(this);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getArea() {
        return area;
    }

    public void setArea(Long area) {
        this.area = area;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public int getMinGrade() {
        return minGrade;
    }

    public void setMinGrade(int minGrade) {
        this.minGrade = minGrade;
    }

    public int getMaxGrade() {
        return maxGrade;
    }

    public void setMaxGrade(int maxGrade) {
        this.maxGrade = maxGrade;
    }

    public Integer getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(Integer maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public boolean isCanceled() {
        return isCanceled;
    }

    public void setCanceled(boolean canceled) {
        isCanceled = canceled;
    }

    public Set<User> getMyGroupUsers() {
        return myGroupUsers;
    }

    public void setMyGroupUsers(Set<User> myGroupUsers) {
        this.myGroupUsers = myGroupUsers;
    }

    public String getDescription() {
        return description;
    }

    public Set<EventComment> getComments() {
        return comments;
    }

    public void setComments(Set<EventComment> comments) {
        this.comments = comments;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ClimbingEvent that = (ClimbingEvent) o;
        return Objects.equals(id, that.id) && Objects.equals(area, that.area) && Objects.equals(minGrade, that.minGrade) && Objects.equals(maxGrade, that.maxGrade) && Objects.equals(maxParticipants, that.maxParticipants) && Objects.equals(createdBy, that.createdBy) && Objects.equals(date, that.date) && Objects.equals(time, that.time) && Objects.equals(isPrivate, that.isPrivate) && Objects.equals(isCanceled, that.isCanceled) && Objects.equals(description, that.description);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, area, minGrade, maxGrade, maxParticipants, createdBy, date, time, isPrivate, isCanceled, description);
    }
}
