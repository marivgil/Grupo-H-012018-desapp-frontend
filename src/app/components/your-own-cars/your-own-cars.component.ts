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
  editedCar;
  index;

  constructor(public _auth: AuthService,
              private _router: Router,
              private _vehicle: VehicleService,
              private _user: UserService) {
              }


  ngOnInit() {}

  addCar() {
    this._router.navigate(['nuevoAuto']);
  }

  editCar(car, index) {
    this._vehicle.editedCar = car;
    this._vehicle.indexEditedCar = index;
    this._router.navigate(['editarAuto']);
  }

  makeAPost() {
    this._router.navigate(['nuevoPost']);
  }


  confirmDeleteCar(id: number, index: number) {
      this.idSeleccionado = id;
      console.log(index);
      $('#eliminationModal').modal({
   //     backdrop: 'static',
   //     keyboard: false
      });
  }

  deleteCar() {
    this._vehicle.deleteCar(this.idSeleccionado).subscribe( res => {
      this._auth.deleteCarLocale(this.index);
    //  this._router.navigate(['tusAutos']);
    });
  }

}
