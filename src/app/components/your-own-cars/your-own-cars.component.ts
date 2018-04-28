import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../interfaces/vehicle.interface';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-your-own-cars',
  templateUrl: './your-own-cars.component.html'
})
export class YourOwnCarsComponent implements OnInit {

  cars: Vehicle[];

  constructor(private _userService:UserService,
              private _router:Router) { }

  ngOnInit() {
    this.cars= this._userService.getUserWithCar().vehicles;
  }

  addCar(){
    this._router.navigate(['nuevoAuto']);
  }

  editCar(){
    console.log("TODO: Hacer modal de edicion de auto");
  }

  deleteCar(){
    console.log("TODO: Hacer modal de confirmacion de eliminacion de auto");
  }

}
