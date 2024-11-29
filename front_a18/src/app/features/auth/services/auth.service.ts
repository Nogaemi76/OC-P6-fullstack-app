import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../interfaces/register.interface';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathAuth = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: Register): Observable<void> {
    return this.httpClient.post<void>(`${this.pathAuth}/register`, registerRequest)
  }

  public login(loginRequest: Login): Observable<any> {
    return this.httpClient.post<any>(`${this.pathAuth}/login`, loginRequest);
  }

}
