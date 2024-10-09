package com.openclassrooms.mddapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.entities.Post;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

}
