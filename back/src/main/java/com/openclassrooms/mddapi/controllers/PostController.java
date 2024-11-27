package com.openclassrooms.mddapi.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.PostDto;
import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.services.PostService;

import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;

@Log
@RequestMapping("/api/posts")
@RestController
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;

	private final ModelMapper modelMapper;

	@PostMapping
	ResponseEntity<String> addPost(@RequestBody PostDto postDto) {

		log.info(postDto.toString());
		// TODO : GET USER ID WITH TOKEN
		postDto.setAuthorId(1L);

		log.info(postDto.toString());

		Post post = convertToEntity(postDto);

		postService.savePost(post);

		return new ResponseEntity<String>("{\"message\":\"Post created !\"}", HttpStatus.OK);
	}

	private Post convertToEntity(PostDto postDto) {
		Post post = modelMapper.map(postDto, Post.class);
		return post;
	}

}
