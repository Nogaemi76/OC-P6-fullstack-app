package com.openclassrooms.mddapi.responses;

import java.time.LocalDate;

import lombok.Data;

@Data
public class PostResponse {

	private long id;

	private String title;

	private String content;

	private String author;

	private String topic;

	private LocalDate created_at;

	private LocalDate updated_at;
}
