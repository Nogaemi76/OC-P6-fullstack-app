package com.openclassrooms.mddapi.controllers;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.UserDto;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.services.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/users")
@RestController
@RequiredArgsConstructor
public class UserController {

	private final UserService userService;

	private final ModelMapper modelMapper;

	@GetMapping("/{id}")
	public ResponseEntity<UserDto> getUserById(@PathVariable("id") final Long id) {
		Optional<User> retrievedUser = userService.getUser(id);
		UserDto retrievedUserDto = convertToDto(retrievedUser);

		return ResponseEntity.ok(retrievedUserDto);
	}

	private UserDto convertToDto(Optional<User> user) {

		UserDto userDto = modelMapper.map(user, UserDto.class);

		userDto.setCreated_at(user.get().getCreatedAt());
		userDto.setUpdated_at(user.get().getUpdatedAt());

		return userDto;
	}
}
