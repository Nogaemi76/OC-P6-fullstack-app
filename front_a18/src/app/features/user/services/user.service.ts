import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequest } from '../interfaces/userRequest.interface';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private pathUsers = 'api/users';

  constructor(private httpClient : HttpClient) { }

  getUserById(id: Number): Observable<User> {
    return this.httpClient.get<User>(`${this.pathUsers}/${id}`);
  }

  updateUser(id: Number, userRequest: UserRequest): Observable<void> {
    return this.httpClient.put<void>(`${this.pathUsers}/${id}`, userRequest);
  }

}
