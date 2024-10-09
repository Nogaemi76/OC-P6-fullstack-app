package com.openclassrooms.mddapi.dtos;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UserDto {

	private long id;

	private String email;

	private String username;

	private String password;

	private LocalDate created_at;

	private LocalDate updated_at;

}
