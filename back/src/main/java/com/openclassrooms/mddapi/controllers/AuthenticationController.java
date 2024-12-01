package com.openclassrooms.mddapi.controllers;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.responses.TokenResponse;
import com.openclassrooms.mddapi.responses.UserResponse;
import com.openclassrooms.mddapi.services.AuthenticationService;
import com.openclassrooms.mddapi.services.JwtService;
import com.openclassrooms.mddapi.services.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;

@Log
@RequestMapping("/api/auth")
@RestController
@RequiredArgsConstructor
public class AuthenticationController {

	private final JwtService jwtService;

	private final AuthenticationService authenticationService;

	private final ModelMapper modelMapper;

	private final UserService userService;

	@PostMapping("/register")
	public ResponseEntity<TokenResponse> register(@RequestBody UserDto registeredUserDto) {

		User registeredUser = convertToEntity(registeredUserDto);

		User authenticatedUser = authenticationService.register(registeredUser);

		// String userEmail = authenticatedUser.getEmail();

		// return new ResponseEntity<String>("{\"message\":\"" + userEmail + " created
		// !\"}", HttpStatus.OK);

		String jwtToken = jwtService.generateToken(authenticatedUser);

		TokenResponse tokenResponse = new TokenResponse();
		tokenResponse.setToken(jwtToken);

		return ResponseEntity.ok(tokenResponse);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticate(@RequestBody UserDto loggedUserDto) {

		log.info(loggedUserDto.toString());

		User loggedUser = convertToEntity(loggedUserDto);

		log.info(loggedUser.toString());

		try {
			User authenticatedUser = authenticationService.authenticate(loggedUser);

			// return ResponseEntity.ok(authenticatedUser.get().getEmail());
			// return new ResponseEntity<String>("{\"token\":\"" +
			// authenticatedUser.get().getEmail() + "\"}",
			// HttpStatus.ACCEPTED);

			log.info(authenticatedUser.toString());

			String jwtToken = jwtService.generateToken(authenticatedUser);

			TokenResponse tokenResponse = new TokenResponse();
			tokenResponse.setToken(jwtToken);

			log.info(jwtToken);
			log.info(tokenResponse.toString());

			return ResponseEntity.ok(tokenResponse);

		} catch (Exception e) {

			String errorMessage = e.getMessage();

			return new ResponseEntity<String>("{\"message\":\"" + errorMessage + "\"}", HttpStatus.UNAUTHORIZED);
		}

		// return ResponseEntity.ok("token");

	}

	@GetMapping("/me")
	public ResponseEntity<UserResponse> getAuthenticatedUser() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		log.info(authentication.toString());

		String username = authentication.getName();

		Optional<User> currentUser = userService.getUserByEmail(username);

		UserDto currentUserDto = convertToDto(currentUser);

		UserResponse currentUserResponse = convertToUserResponse(currentUserDto);

		log.info(currentUserResponse.toString());

		return ResponseEntity.ok(currentUserResponse);

	}

	private User convertToEntity(UserDto userDto) {
		User user = modelMapper.map(userDto, User.class);

		user.setCreatedAt(userDto.getCreated_at());
		user.setUpdatedAt(userDto.getUpdated_at());

		return user;
	}

	private UserDto convertToDto(Optional<User> user) {
		UserDto userDto = modelMapper.map(user, UserDto.class);

		userDto.setCreated_at(user.get().getCreatedAt());
		userDto.setUpdated_at(user.get().getUpdatedAt());

		return userDto;
	}

	private UserResponse convertToUserResponse(UserDto userDto) {
		UserResponse userResponse = new UserResponse();

		userResponse.setId(userDto.getId());
		userResponse.setName(userDto.getName());
		userResponse.setEmail(userDto.getEmail());

		userResponse.setCreated_at(userDto.getCreated_at());
		userResponse.setUpdated_at(userDto.getUpdated_at());

		return userResponse;
	}

}
