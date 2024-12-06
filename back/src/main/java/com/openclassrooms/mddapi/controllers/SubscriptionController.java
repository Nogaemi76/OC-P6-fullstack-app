package com.openclassrooms.mddapi.controllers;

import java.util.List;
//import java.util.stream.LongStream;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.SubscriptionDto;
import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.entities.Topic;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.services.SubscriptionService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@RequestMapping("/api/subscriptions")
@RestController
@RequiredArgsConstructor
public class SubscriptionController {

	private final SubscriptionService subscriptionService;

	private final TopicService topicService;

	private final UserService userService;

	private final ModelMapper modelMapper;

	@PostMapping
	ResponseEntity<String> addSubscription(@RequestBody SubscriptionDto subscriptionDto) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Optional<User> user = userService.getUserByEmail(username);

		Long userId = user.get().getId();

		subscriptionDto.setUserId(userId);

		Subscription subscription = convertToEntity(subscriptionDto);

		Long topicId = subscription.getTopicId();

		List<Subscription> subscriptionList = subscriptionService.getSubscriptionsByUserId(subscription.getUserId());

		Subscription subscriptionFound = subscriptionList.stream().filter(x -> x.getTopicId().equals(topicId))
				.findFirst().orElse(null);

		String message = "";

		if (subscriptionFound == null) {
			subscriptionService.saveSubscription(subscription);
			message = "Subscription created !";
		} else {
			message = "Subscription already exists.";
		}

		return new ResponseEntity<String>("{\"message\":\"" + message + "\"}", HttpStatus.OK);

	}

	@GetMapping("/{id}")
	public List<Topic> getTopicSubscribedByUseriD(@PathVariable("id") final Long id) {
		List<Subscription> subscriptionList = subscriptionService.getSubscriptionsByUserId(id);

		List<Long> listId = subscriptionList.stream().map(e -> e.getTopicId()).toList();

		List<Topic> topicsSubscribed = topicService.getListTopicsById(listId);

		return topicsSubscribed;
	}

	@Transactional
	@DeleteMapping("/{id}")
	public boolean deleteSubscriptionByTopicId(@PathVariable("id") final Long topicId) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Optional<User> user = userService.getUserByEmail(username);

		Long userId = user.get().getId();

		subscriptionService.deleteSubscriptionByTopicIdAndUserId(topicId, userId);
		return true;
	}

	private Subscription convertToEntity(SubscriptionDto subscriptionDto) {
		Subscription subscription = modelMapper.map(subscriptionDto, Subscription.class);
		return subscription;
	}

}
