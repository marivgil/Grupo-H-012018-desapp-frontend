
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})


export class NavbarComponent {

  user: any;
  localStorage = localStorage;

  constructor( public auth: AuthService) {
    if (localStorage.getItem('access_token')) {
         this.auth.getProfile((err, profile) => {
         this.user = profile;
         });
    }
    console.log(localStorage);
  }

  isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  logout() {
    this.auth.logout();
  }

  login() {
    this.auth.login();
  }

}
