package com.openclassrooms.mddapi.entities;

import java.time.LocalDate;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "posts")
public class Post {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(nullable = false)
	private long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private String content;

	@Column(name = "author_id")
	private Long authorId;

	@Column(name = "topic_id")
	private Long topicId;

	@CreationTimestamp
	@Column(name = "created_at")
	private LocalDate createdAt;

	@UpdateTimestamp
	@Column(name = "updated_at")
	private LocalDate updatedAt;

}
