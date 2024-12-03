import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { LoginRequest } from '../../interfaces/loginRequest.interface';
import { Token } from '../../interfaces/token.interface';
import { User } from '../../../user/interfaces/user.interface';

import { AuthService } from '../../services/auth.service';
import { UserSessionService } from '../../../../services/user-session.service';

import { ResponsiveService } from '../../../../services/responsive.service';

import { HeaderComponent } from '../../../../shared/components/header/header.component';


const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  constructor(
    private authService: AuthService,
    private userSessionService: UserSessionService,
    private router: Router,
    public responsiveService: ResponsiveService
  ) { }

  submit(): void {
    const loginRequest = this.loginForm.value as LoginRequest;

    this.authService.login(loginRequest).subscribe({
      next: (response: Token) => {
        // console.log('response', response);
        localStorage.removeItem('token');
        localStorage.setItem('token', response.token);

        this.authService.me().subscribe((user: User) => {
          this.userSessionService.logIn(user);
          this.router.navigate(['/posts']);
        });

        this.router.navigate(['/posts']);
      },

      error: (error) => {
        console.log(error);
      },
    });
  }
}
