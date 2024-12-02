import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../features/user/interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  isLogged = false;
  user: User | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  isLogged$(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  logIn(loggedUser: User): void {
    this.user = loggedUser;
    this.isLogged = true;
    this.next();
  }

  logOut(): void {
    localStorage.removeItem('token');
    this.user = undefined;
    this.isLogged = false;
    this.next();
  }

  next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
