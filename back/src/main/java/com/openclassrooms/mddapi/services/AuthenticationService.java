package com.openclassrooms.mddapi.services;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
public class AuthenticationService {

	private final UserRepository userRepository;

	public User register(User registeredUser) {

		return userRepository.save(registeredUser);
	}
}
