package com.openclassrooms.mddapi.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data
public class SubscriptionDto {

	private long id;

	private Long userId;

	private Long topicId;

	private LocalDate created_at;

	private LocalDate updated_at;
}
