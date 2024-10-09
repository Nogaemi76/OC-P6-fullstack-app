package com.openclassrooms.mddapi.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data
public class TopicDto {

	private long id;

	private String title;

	private String description;

	private LocalDate createdAt;

	private LocalDate updatedAt;
}
