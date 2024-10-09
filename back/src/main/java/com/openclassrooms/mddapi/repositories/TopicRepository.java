package com.openclassrooms.mddapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.openclassrooms.mddapi.entities.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

}
