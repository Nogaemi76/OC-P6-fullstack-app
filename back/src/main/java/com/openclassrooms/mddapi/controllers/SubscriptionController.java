package com.openclassrooms.mddapi.controllers;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.SubscriptionDto;
import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.services.SubscriptionService;

import lombok.RequiredArgsConstructor;

//@Log
@RequestMapping("/api/subscriptions")
@RestController
@RequiredArgsConstructor
public class SubscriptionController {

	private final SubscriptionService subscriptionService;

	private final ModelMapper modelMapper;

	@PostMapping
	ResponseEntity<String> addSubscription(@RequestBody SubscriptionDto subscriptionDto) {

		// TODO : GET USER ID WITH TOKEN
		subscriptionDto.setUserId(1L);
		// log.info(subscriptionDto.toString());

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

	private Subscription convertToEntity(SubscriptionDto subscriptionDto) {
		Subscription subscription = modelMapper.map(subscriptionDto, Subscription.class);
		return subscription;
	}

}
