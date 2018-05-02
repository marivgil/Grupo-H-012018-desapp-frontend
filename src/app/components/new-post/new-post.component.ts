import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../interfaces/vehicle.interface";
import { User } from '../../interfaces/user.interface';
import { UserService } from "../../services/user.service"
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {

  forma: FormGroup;
  vehicle:Vehicle;
  user:User;

  zoom: number= 15;
  //Start position
  lat: number = -34.603418;
  lng: number = -58.381592;

  constructor( private _userService: UserService,
              private _authService: AuthService) {

    this.vehicle= this._userService.getUserWithCar().vehicles[0];
    this.user= this._authService.userBD;

    this.forma= new FormGroup({
      'phone': new FormControl('',[Validators.required]),
      'costPerDay': new FormControl('', [Validators.required]),
      'pickUpCord': new FormGroup({
        'lat': new FormControl(),
        'lng': new FormControl()
      })
    })
   }

  ngOnInit() {
  }

  post(){
    console.log(this.forma);
  }

  mapClicked($event:any){
    this.forma.get('pickUpCoord').get('lat').setValue= $event.coords.lat,
    this.forma.get('pickUpCoord').get('lng').setValue= $event.coords.lng
  }
  /**
   * var newMarker = {
      name:'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false,
    }
   */
}
