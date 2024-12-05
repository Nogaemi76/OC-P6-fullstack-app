package com.openclassrooms.mddapi.responses;

import lombok.Data;

@Data
public class CommentResponse {

	private long id;

	private String content;

	private String author;

}
