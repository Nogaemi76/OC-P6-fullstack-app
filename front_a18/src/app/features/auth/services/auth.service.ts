import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/registerRequest.interface';
import { Observable } from 'rxjs';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { Token } from '../interfaces/token.interface';
import { User } from '../../user/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private pathAuth = 'api/auth';

  constructor(private httpClient: HttpClient) {}

  register(registerRequest: RegisterRequest): Observable<Token> {
    return this.httpClient.post<Token>(
      `${this.pathAuth}/register`,
      registerRequest
    );
  }

  login(loginRequest: LoginRequest): Observable<Token> {
    // console.log('authservice', loginRequest);
    return this.httpClient.post<Token>(`${this.pathAuth}/login`, loginRequest);
  }

  me(): Observable<User> {
    return this.httpClient.get<User>(`${this.pathAuth}/me`);
  }
}
