package com.openclassrooms.mddapi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.services.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

	private final AuthenticationService authenticationService;

	private final ModelMapper modelMapper;

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody UserDto registeredUserDto) {

		User registeredUser = convertToEntity(registeredUserDto);

		User authenticatedUser = authenticationService.register(registeredUser);

		String userEmail = authenticatedUser.getEmail();

		return new ResponseEntity<String>("{\"message\":\"" + userEmail + " created !\"}", HttpStatus.OK);

	}

	private User convertToEntity(UserDto userDto) {
		User user = modelMapper.map(userDto, User.class);
		return user;
	}

//	private UserDto convertToDto(User user) {
//		UserDto userDto = modelMapper.map(user, UserDto.class);
//		return userDto;
//	}

}
