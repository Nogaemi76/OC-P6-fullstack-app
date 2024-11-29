import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from "../../../../shared/components/header/header.component";
import { AuthService } from '../../services/auth.service';
import { Login } from '../../interfaces/login.interface';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
]

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.min(8)])
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

   submit(): void {
    const loginRequest = this.loginForm.value as Login;
    console.log(loginRequest);
    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigate(['/posts']);
      },
      error: error => {
        console.log(error);
      }
    });
   }

}
