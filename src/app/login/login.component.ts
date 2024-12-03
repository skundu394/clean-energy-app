import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(): void {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      (res) => {
        if (res && res.success) {
          localStorage.setItem('jwt', res.token);
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }
}




