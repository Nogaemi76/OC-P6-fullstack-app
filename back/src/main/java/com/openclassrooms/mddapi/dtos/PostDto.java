package com.openclassrooms.mddapi.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PostDto {

	private long id;

	private String title;

	private String content;

	private Long authorId;

	private Long topicId;

	private LocalDate created_at;

	private LocalDate updated_at;
}
