package com.openclassrooms.mddapi.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.TopicDto;
import com.openclassrooms.mddapi.entities.Topic;
import com.openclassrooms.mddapi.services.TopicService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/topics")
@RestController
@RequiredArgsConstructor
public class TopicController {

	private final TopicService topicService;

	private final ModelMapper modelMapper;

	@GetMapping
	public List<TopicDto> getAllTopics() {
		List<Topic> topics = topicService.getAllTopics();

		List<TopicDto> topicDtos = topics.stream().map(this::convertToDto).collect(Collectors.toList());

		if (topicDtos.isEmpty()) {
			return null;

		} else {
			return topicDtos;
		}
	}

	@GetMapping("/{id}")
	public TopicDto getTopicById(@PathVariable("id") final Long id) {
		Optional<Topic> retrievedTopic = topicService.getTopicById(id);

		if (retrievedTopic.isEmpty()) {
			return null;
		} else {
			TopicDto retrievedTopicDto = convertToDto(retrievedTopic.get());
			return retrievedTopicDto;
		}

	}

	@PostMapping
	ResponseEntity<String> addTopic(@RequestBody TopicDto topicDto) {

		Topic topic = convertToEntity(topicDto);

		topicService.saveTopic(topic);

		return new ResponseEntity<String>("{\"message\":\"Topic created !\"}", HttpStatus.OK);
	}

	private TopicDto convertToDto(Topic topic) {

		TopicDto topicDto = modelMapper.map(topic, TopicDto.class);
		return topicDto;

	}

	private Topic convertToEntity(TopicDto topicDto) {
		Topic topic = modelMapper.map(topicDto, Topic.class);
		return topic;
	}

}
