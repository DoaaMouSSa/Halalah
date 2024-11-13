import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  constructor(private _authService:AuthService,private _router:Router) {}
  logout(){
    this._authService.logOut();
    this._router.navigate(['/login'])
  }
  }
