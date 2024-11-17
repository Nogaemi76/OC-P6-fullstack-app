package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.entities.Subscription;
import com.openclassrooms.mddapi.repositories.SubscriptionRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
public class SubscriptionService {

	private final SubscriptionRepository subscriptionRepository;

	public Optional<Subscription> getSubscriptionById(final Long id) {
		return subscriptionRepository.findById(id);
	}

	public Subscription saveSubscription(Subscription subscription) {
		Subscription savedSubscription = subscriptionRepository.save(subscription);
		return savedSubscription;
	}

	public List<Subscription> getSubscriptionsByUserId(Long userId) {
		return (List<Subscription>) subscriptionRepository.findByUserId(userId);
	}
}
