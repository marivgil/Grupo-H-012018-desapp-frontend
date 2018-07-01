import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable()
export class UserGuard implements CanActivate {

  constructor( private _auth: AuthService,
               private _user: UserService ) {}


  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if ( this._user.userBD ) {
      console.log("El guard paso!");
      return true;
    } else {
      this._auth.getProfile((err, profile) => {
        if (err) {
          console.log("falle");
        }
        return true;
      });
    }
  }

}
