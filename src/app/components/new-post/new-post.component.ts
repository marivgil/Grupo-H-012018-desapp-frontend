import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../interfaces/vehicle.interface";
import { User } from '../../interfaces/user.interface';
import { UserService } from "../../services/user.service"
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent implements OnInit {

  vehicle:Vehicle;
  user:User;
  forma: FormGroup;

//Inicializaciones para calendario
date= new Date();
   
myDateRangePickerOptions: IMyDrpOptions={
    dateFormat: 'dd.mm.yyyy',
    disableUntil:{
          year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            day: this.date.getDate()
    }
  }
 

//Inicializaciones para mapas
  zoom: number= 15;
  //Start position
  lat: number = -34.603418;
  lng: number = -58.381592;

  marker:any;
  returnMarkers:any[]=[];


  constructor( private _userService: UserService,
              private _authService: AuthService,
              private _router: Router) {

    this.vehicle= this._userService.getUserWithCar().vehicles[0];
    this.user= this._authService.userBD;

    this.forma= new FormGroup({
      'phone': new FormControl('',      [Validators.required]),
      'costPerDay': new FormControl('', [Validators.required]),
      'pickUpCoord': new FormGroup({
                                    'lat': new FormControl(),
                                    'lng': new FormControl()
                                  },    Validators.required),
      'returnMarkers': new FormArray([],Validators.required),
      'dateRange':new FormControl()
    })
   }

  ngOnInit() {
  }

  post(){

    console.log(this.forma);
  }

  mapClicked($event:any){
    this.marker = {
      name:'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }
    this.forma.get('pickUpCoord').get('lat').setValue= $event.coords.lat,
    this.forma.get('pickUpCoord').get('lng').setValue= $event.coords.lng
  }

  mapReturnClicked($event){
    
    let marker= new FormGroup({
      'lat': new FormControl($event.coords.lat),
      'lng': new FormControl($event.coords.lng)
    });
    (<FormArray>this.forma.controls['returnMarkers']).push(marker);
    let m = {
      name:'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };
    this.returnMarkers.push(m);
  }

  volverAHome(){
    this._router.navigate(['/home']);
  }

  setDateRange(): void {
    // Set date range (today) using the patchValue function
    let date = new Date();
    this.forma.patchValue({dateRange: {
        beginDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        },
        endDate: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        }
    }});
}

}
