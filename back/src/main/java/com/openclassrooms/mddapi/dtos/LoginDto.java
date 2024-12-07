package com.openclassrooms.mddapi.dtos;

import lombok.Data;

@Data
public class LoginDto {

	private String name;

	private String email;

	private String password;
}
