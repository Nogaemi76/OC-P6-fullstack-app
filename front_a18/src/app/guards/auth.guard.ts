import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserSessionService } from '../services/user-session.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userSessionService = inject(UserSessionService);

  if(!userSessionService.isLogged) {
    router.navigate(['auth/login']);
    return false;

  }
  return true;
};
