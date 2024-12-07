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

  loginRequest!: LoginRequest

  loginForm = new FormGroup({
    nameOrEmail: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(8)]),
  });

  constructor(
    private authService: AuthService,
    private userSessionService: UserSessionService,
    private router: Router,
    public responsiveService: ResponsiveService
  ) { }

  submit(): void {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex = /^[a-zA-Z0-9]{2,}$/;

    this.loginRequest = {
      name: '',
      email: '',
      password: ''
    }

    let nameOrEmailValue = this.loginForm.value.nameOrEmail;
    console.log('nameOrEmailValue', nameOrEmailValue);

    if (nameOrEmailValue && emailRegex.test(nameOrEmailValue)) {
      console.log(emailRegex.test(nameOrEmailValue))
      console.log(nameOrEmailValue && emailRegex.test(nameOrEmailValue))

      this.loginRequest.email = nameOrEmailValue;
    } else if (nameOrEmailValue && nameRegex.test(nameOrEmailValue)) {
      this.loginRequest.name = nameOrEmailValue;
    }

    let passwordValue = this.loginForm.value.password;
    if(passwordValue) {
      this.loginRequest.password = passwordValue;
    }

    console.log('this.loginRequest', this.loginRequest);

    localStorage.removeItem('token');
    this.authService.login(this.loginRequest).subscribe({
      next: (response: Token) => {
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
