package com.openclassrooms.mddapi.controllers;

import java.time.LocalDate;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.responses.UserResponse;
import com.openclassrooms.mddapi.services.UserService;

import lombok.RequiredArgsConstructor;

//@Log
@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	private final ModelMapper modelMapper;

	@GetMapping("/{id}")
	public ResponseEntity<UserResponse> getUserById(@PathVariable("id") final Long id) {
		Optional<User> retrievedUser = userService.getUser(id);
		UserDto retrievedUserDto = convertToDto(retrievedUser);

		UserResponse retrievedUserResponse = convertToUserResponse(retrievedUserDto);

		return ResponseEntity.ok(retrievedUserResponse);
	}

	@PutMapping("/{id}")
	public ResponseEntity<String> updateUser(@PathVariable("id") final Long id, @RequestBody UserDto userDto) {
		User user = convertToEntity(userDto);

		Optional<User> retrievedUser = userService.getUser(id);

		if (retrievedUser.isPresent()) {
			User currentUser = retrievedUser.get();

			String name = user.getName();
			if (name != "") {
				currentUser.setName(name);
			}

			String email = user.getEmail();
			if (email != "") {
				currentUser.setEmail(email);
			}
			currentUser.setUpdatedAt(LocalDate.now());

			userService.saveUser(currentUser);

			return new ResponseEntity<String>("{\"message\":\"User Updated !\"}", HttpStatus.OK);

		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	private UserDto convertToDto(Optional<User> user) {

		UserDto userDto = modelMapper.map(user, UserDto.class);

		userDto.setCreated_at(user.get().getCreatedAt());
		userDto.setUpdated_at(user.get().getUpdatedAt());

		return userDto;
	}

	private User convertToEntity(UserDto userDto) {
		User user = modelMapper.map(userDto, User.class);
		return user;
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
