package com.example.springboot.data.repository;

import com.example.springboot.data.entity.EventComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventCommentRepository extends JpaRepository<EventComment, Long> {

    List<EventComment> findEventCommentsByEventOrderByCreatedDate(Long eventId);
}
