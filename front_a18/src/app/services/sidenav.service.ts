import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private toggleSubject = new BehaviorSubject<void>(undefined);

  toggleSidenav() {
    this.toggleSubject.next();
  }

  getToggleObservable() {
    return this.toggleSubject.asObservable();
  }
}
