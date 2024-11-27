package com.openclassrooms.mddapi.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.entities.Post;
import com.openclassrooms.mddapi.repositories.PostRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Service
@RequiredArgsConstructor
public class PostService {

	private final PostRepository postRepository;

	public List<Post> getAllPosts() {
		return (List<Post>) postRepository.findAll();
	}

	public Optional<Post> getPostById(final Long id) {
		return postRepository.findById(id);
	}

	public Post savePost(Post post) {
		Post savedPost = postRepository.save(post);
		return savedPost;
	}
}
