
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})


export class NavbarComponent {

  user: any;

  constructor( public auth:AuthService) { 
    if(localStorage.getItem('access_token')){
       if (this.auth.userProfile) {
         this.user = this.auth.userProfile;
      } else {
         this.auth.getProfile((err, profile) => {
         this.user = profile;
        });
      }   
     }
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
