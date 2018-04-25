import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

  profile: any;
  user:User;

  constructor(public auth: AuthService,
              public _user:UserService) { 
    if (this.auth.userProfile) {
      this.profile = this.auth.userProfile;
    } else {
      this.auth.getProfile((err, profile) => {
        this.profile = profile;
      });
    }    
    this.user= _user.getUser();
  }


/*{
  "sub": "google-oauth2|106572254188915518115",
  "given_name": "Analía",
  "family_name": "Redonda",
  "nickname": "a.redonda89",
  "name": "Analía Redonda",
  "picture": "https://lh3.googleusercontent.com/-UlZYyw3K9fk/AAAAAAAAAAI/AAAAAAAAAz4/pcNGPnRW1BE/photo.jpg",
  "gender": "female",
  "locale": "es-419",
  "updated_at": "2018-04-18T20:17:27.397Z",
  "email": "a.redonda89@gmail.com",
  "email_verified": true
}*/
}