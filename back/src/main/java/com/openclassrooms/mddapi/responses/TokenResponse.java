package com.openclassrooms.mddapi.responses;

import lombok.Data;

@Data
public class TokenResponse {

	private String token;

	public String getToken() {
		return token;
	}
}
