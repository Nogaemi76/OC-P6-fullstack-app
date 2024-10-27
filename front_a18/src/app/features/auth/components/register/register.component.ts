import { Component } from '@angular/core';

import { Router, RouterLink, RouterOutlet } from '@angular/router';

import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { Register } from '../../interfaces/register.interface';
import { AuthService } from '../../services/auth.service';

const materialModules = [
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule
]

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    ReactiveFormsModule,
    ...materialModules,
    HeaderComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // TODO Change the regex
  private passwordRegex: RegExp = /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d).{8,}$/;

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.min(8), Validators.pattern(this.passwordRegex)])
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    ) {}

  // TODO Submit with Register
  // handleSubmit() {
  //   alert(this.registerForm.value.username + ' | ' + this.registerForm.value.email + ' | ' + this.registerForm.value.password);
  // }

  public submit(): void {
    const registerRequest = this.registerForm.value as Register;
    this.authService.register(registerRequest).subscribe({
      next: () => {
        this.router.navigate(['/auth/login']);
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
