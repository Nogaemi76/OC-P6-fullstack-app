package com.openclassrooms.mddapi.services;

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

	public Post savePost(Post post) {
		Post savedPost = postRepository.save(post);
		return savedPost;
	}
}
