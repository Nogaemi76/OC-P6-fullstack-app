package com.openclassrooms.mddapi.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
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

	private final PasswordEncoder passwordEncoder;

	private final AuthenticationManager authenticationManager;

	public User register(User registeredUser) {

		// return userRepository.save(registeredUser);

		User user = new User();

		user.setUsername(registeredUser.getUsername());
		user.setEmail(registeredUser.getEmail());
		user.setPassword(passwordEncoder.encode(registeredUser.getPassword()));

		return userRepository.save(user);
	}

	public User authenticate(User loggedUser) {

		// return userRepository.findByEmail(loggedUser.getEmail());

		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loggedUser.getEmail(), loggedUser.getPassword()));

		return userRepository.findByEmail(loggedUser.getEmail()).orElseThrow();

	}
}
