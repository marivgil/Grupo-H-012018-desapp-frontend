import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PostsService } from './posts.service';
import { VehicleService } from './vehicle.service';

@Injectable()
export class CarGuard implements CanActivate {

  constructor(private _vehicle: VehicleService, private router: Router) {}

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._vehicle.editedCar) {
      return true;
    } else {
      console.log("Bloqueado por el guard");
      this.router.navigate(['/tusAutos']);
    }
  }
}
