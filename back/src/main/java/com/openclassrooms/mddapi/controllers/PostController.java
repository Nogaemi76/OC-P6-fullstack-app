package com.openclassrooms.mddapi.controllers;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.openclassrooms.mddapi.dtos.PostDto;
import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.entities.Topic;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.responses.PostResponse;
import com.openclassrooms.mddapi.services.PostService;
import com.openclassrooms.mddapi.services.TopicService;
import com.openclassrooms.mddapi.services.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/posts")
@RestController
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;

	private final UserService userService;

	private final TopicService topicService;

	private final ModelMapper modelMapper;

	@GetMapping
	public List<PostResponse> getAllPosts() {
		List<Post> posts = postService.getAllPosts();

		List<PostResponse> postResponses = posts.stream().map(this::convertToPostResponse).collect(Collectors.toList());

		return postResponses;

	}

	@GetMapping("/{id}")
	public PostResponse getPostById(@PathVariable("id") final Long id) {
		Optional<Post> retrievePost = postService.getPostById(id);

		if (retrievePost.isEmpty()) {
			return null;
		} else {

			PostResponse postResponse = convertToPostResponse(retrievePost.get());

			return postResponse;
		}
	}

	@PostMapping
	ResponseEntity<String> addPost(@RequestBody PostDto postDto) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Optional<User> user = userService.getUserByEmail(username);

		Long userId = user.get().getId();
		postDto.setAuthorId(userId);

		Post post = convertToEntity(postDto);

		postService.savePost(post);

		return new ResponseEntity<String>("{\"message\":\"Post created !\"}", HttpStatus.OK);
	}

	private Post convertToEntity(PostDto postDto) {
		Post post = modelMapper.map(postDto, Post.class);

		post.setCreatedAt(postDto.getCreated_at());
		post.setUpdatedAt(postDto.getUpdated_at());

		return post;
	}

	private PostResponse convertToPostResponse(Post post) {

		Optional<User> author = userService.getUser(post.getAuthorId());
		Optional<Topic> topic = topicService.getTopicById(post.getTopicId());

		PostResponse postResponse = new PostResponse();

		postResponse.setId(post.getId());
		postResponse.setTitle(post.getTitle());
		postResponse.setContent(post.getContent());

		postResponse.setAuthor(author.get().getName());
		postResponse.setTopic(topic.get().getTitle());

		postResponse.setCreated_at(post.getCreatedAt());
		postResponse.setUpdated_at(post.getUpdatedAt());

		return postResponse;
	}

}
