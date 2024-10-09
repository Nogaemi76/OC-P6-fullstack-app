package com.openclassrooms.mddapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

}
