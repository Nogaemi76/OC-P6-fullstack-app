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

import { HeaderComponent } from '../../../../shared/components/header/header.component';

import { RegisterRequest } from '../../interfaces/registerRequest.interface';
import { Token } from '../../interfaces/token.interface';
import { User } from '../../../user/interfaces/user.interface';

import { AuthService } from '../../services/auth.service';
import { UserSessionService } from '../../../../services/user-session.service';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
];

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  // TODO Change the regex
  private passwordRegex: RegExp =
    /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.min(8),
      Validators.pattern(this.passwordRegex),
    ]),
  });

  constructor(
    private authService: AuthService,
    private userSessionService: UserSessionService,
    private router: Router
  ) {}

  submit(): void {
    const registerRequest = this.registerForm.value as RegisterRequest;

    this.authService.register(registerRequest).subscribe({
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
