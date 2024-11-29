package com.openclassrooms.mddapi.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.repositories.UserRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;

	public Optional<User> getUser(final Long id) {
		return userRepository.findById(id);
	}

	public Optional<User> getUserByEmail(final String email) {
		return userRepository.findByEmail(email);
	}

//	public Optional<User> getUserByUsername(final String username) {
//		return userRepository.findOne(username);
//	}

}
