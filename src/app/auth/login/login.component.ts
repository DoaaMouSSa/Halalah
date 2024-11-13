import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  loginForm!: FormGroup;
  message:any;

  constructor(private fb: FormBuilder,private _authService:AuthService,private _router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe(
        response => {
          const token = localStorage.getItem('token');
          this.message=response.messageEn;
          if(response.isSuccess==true)
          {
            this._router.navigate(['/dashboard']);
          }
        },
        error => {
          console.error('Registration error:', error);
          // Handle registration error
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}