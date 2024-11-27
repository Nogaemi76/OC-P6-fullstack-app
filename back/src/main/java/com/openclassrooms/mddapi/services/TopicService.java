package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.entities.Topic;
import com.openclassrooms.mddapi.repositories.TopicRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
public class TopicService {

	private final TopicRepository topicRepository;

	public List<Topic> getAllTopics() {
		return (List<Topic>) topicRepository.findAll();
	}

	public List<Topic> getListTopicsById(List<Long> ids) {
		return (List<Topic>) topicRepository.findAllById(ids);
	}

	public Optional<Topic> getTopicById(final Long id) {
		return topicRepository.findById(id);
	}

	public Topic saveTopic(Topic topic) {
		Topic savedTopic = topicRepository.save(topic);
		return savedTopic;

	}

}
