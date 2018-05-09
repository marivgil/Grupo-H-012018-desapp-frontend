
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})


export class NavbarComponent {

  constructor( public auth:AuthService) { 
  }

  isAuthenticated():boolean{
    return this.auth.isAuthenticated();
  }

  logout(){
    this.auth.logout();
  }

  login(){
    this.auth.login();
  }

}
