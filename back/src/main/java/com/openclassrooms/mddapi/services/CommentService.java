package com.openclassrooms.mddapi.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.entities.Comment;
import com.openclassrooms.mddapi.repositories.CommentRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;

	public List<Comment> getCommentsByPostId(final Long postId) {
		return (List<Comment>) commentRepository.findByPostId(postId);
	}

	public Comment saveComment(Comment comment) {
		Comment savedComment = commentRepository.save(comment);
		return savedComment;
	}

}
