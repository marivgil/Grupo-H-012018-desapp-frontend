
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})


export class NavbarComponent {

  user: any;
  localStorage = localStorage;

  constructor( public auth: AuthService,
                public _user: UserService) {
    if (localStorage.getItem('access_token')) {
         this.auth.getProfile((err, profile) => {
         this.user = profile;
         });
    }
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
