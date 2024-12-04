import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { Observable } from 'rxjs';
import { PostRequest } from '../interfaces/postRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private pathPost = 'api/posts';

constructor(private httpClient: HttpClient) { }

  createPost(postRequest: PostRequest): Observable<void> {
    return this.httpClient.post<void>(this.pathPost, postRequest);
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.pathPost);
  }

  getPostById(id: Number) {
    return this.httpClient.get<Post>(`${this.pathPost}/${id}`);
  }
}
