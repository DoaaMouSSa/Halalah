import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _authService:AuthService,private _router:Router) {}
  logout(){
    alert('test')
    this._authService.logOut();
    this._router.navigate(['/login'])
  }
  }
