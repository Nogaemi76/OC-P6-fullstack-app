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

import com.openclassrooms.mddapi.dtos.CommentDto;
import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.entities.User;
import com.openclassrooms.mddapi.responses.CommentResponse;
import com.openclassrooms.mddapi.services.CommentService;
import com.openclassrooms.mddapi.services.UserService;

import lombok.RequiredArgsConstructor;

@RequestMapping("/api/comments")
@RestController
@RequiredArgsConstructor
public class CommentController {

	private final CommentService commentService;

	private final UserService userService;

	private final ModelMapper modelMapper;

	@PostMapping
	ResponseEntity<String> addComment(@RequestBody CommentDto commentDto) {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String username = authentication.getName();

		Optional<User> user = userService.getUserByEmail(username);

		Long userId = user.get().getId();

		commentDto.setAuthorId(userId);

		Comment comment = convertToEntity(commentDto);

		commentService.saveComment(comment);

		return new ResponseEntity<String>("{\"message\":\"Comment created !\"}", HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public List<CommentResponse> getCommentsByPostId(@PathVariable("id") final Long id) {
		List<Comment> commentList = commentService.getCommentsByPostId(id);

		List<CommentResponse> commentResponses = commentList.stream().map(this::convertToCommentResponse)
				.collect(Collectors.toList());

		return commentResponses;
	}

	private Comment convertToEntity(CommentDto commentDto) {

		Comment comment = modelMapper.map(commentDto, Comment.class);

		return comment;
	}

	private CommentResponse convertToCommentResponse(Comment comment) {

		Optional<User> author = userService.getUser(comment.getAuthorId());

		CommentResponse commentResponse = new CommentResponse();

		commentResponse.setId(comment.getId());

		commentResponse.setContent(comment.getContent());

		commentResponse.setAuthor(author.get().getName());

		return commentResponse;
	}
}
