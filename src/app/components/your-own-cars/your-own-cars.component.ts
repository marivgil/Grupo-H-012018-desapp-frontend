import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

declare var $;
@Component({
  selector: 'app-your-own-cars',
  templateUrl: './your-own-cars.component.html'
})
export class YourOwnCarsComponent implements OnInit {

  cars: Vehicle[];

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
    this.cars = this._auth.userBD.vehicles;
    console.log(this.cars);
  }

  addCar() {
    this._router.navigate(['nuevoAuto']);
  }

  editCar() {
    console.log("TODO: Hacer modal de edicion de auto");
  }

  makeAPost() {
    this._router.navigate(['nuevoPost']);
  }

  deleteCar() {
      $('#eliminationModal').modal({
   //     backdrop: 'static',
   //     keyboard: false
      });
  }

}
