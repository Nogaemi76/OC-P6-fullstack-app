package com.openclassrooms.mddapi.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data
public class CommentDto {

	private long id;

	private String content;

	private Long authorId;

	private Long postId;

	private LocalDate createdAt;

	private LocalDate updatedAt;
}
