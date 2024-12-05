import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentRequest } from '../interfaces/commentRequest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private pathComment = 'api/comments';

  constructor(private httpClient: HttpClient) { }

  createComment(commentRequest: CommentRequest): Observable<void> {
    return this.httpClient.post<void>(this.pathComment, commentRequest);
  }

  // getCommentsByPostId(id: Number): Observable<Comment[]> {
  //   return this.httpClient.get<Comment[]>(`${this.pathComment}/${id}`);
  // }

   getCommentsByPostId(postId: Number): Observable<any> {
    return this.httpClient.get<any>(`${this.pathComment}/${postId}`);
  }

}
