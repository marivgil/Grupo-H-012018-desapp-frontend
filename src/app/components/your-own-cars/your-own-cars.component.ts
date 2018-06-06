import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { VehicleService } from '../../services/vehicle.service';

declare var $;
@Component({
  selector: 'app-your-own-cars',
  templateUrl: './your-own-cars.component.html'
})
export class YourOwnCarsComponent implements OnInit {

  idSeleccionado: number;

  constructor(public _auth: AuthService,
              private _router: Router,
              private _vehicle: VehicleService,
              private _user: UserService) { }

  ngOnInit() {
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


  confirmDeleteCar(id: number) {
      this.idSeleccionado = id;
      console.log(id);
      $('#eliminationModal').modal({
   //     backdrop: 'static',
   //     keyboard: false
      });
  }

  deleteCar() {
    this._vehicle.deleteCar(this.idSeleccionado).subscribe( res => {
      this._auth.userBD = res;
      this._router.navigate(['tusAutos']);
    });
  }

}
