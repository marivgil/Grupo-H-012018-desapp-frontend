import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from "./user.service";
import { filter } from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';
import * as auth0 from 'auth0-js';
import { VehicleService } from './vehicle.service';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: '72SUiqt2QlHDSSXclNVJA9LuOkZ3vgiu',
    domain: 'carpnd.auth0.com',
    responseType: 'token id_token',
    audience: 'https://carpnd.auth0.com/userinfo',
    redirectUri: this.router.navigate['home'],
    scope: 'openid profile email'
  });

  constructor(public router: Router,
              private _userService: UserService,
              private _vehicle: VehicleService) {}

  userProfile ;
  userBD: any;

    public getProfile(cb): any {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      console.log("No hay token");
      }

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
        localStorage.setItem('img', profile.picture),
        this._userService.getUser(profile.email).subscribe( res => {
          this.userBD = res.json();
        });
      }
      cb(err, profile);
    });

    this.userBD = this._userService.getUser;
}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    this.getProfile((err , res) => {
      this.userProfile = res;
    });
    }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public deleteCarLocale(i: number) {
    this.userBD.vehicles.splice( i, 1);
  }

  public replaceCar( car: any ) {
    this.userBD.vehicles.splice(this._vehicle.indexEditedCar , 1, car);
  }


}
