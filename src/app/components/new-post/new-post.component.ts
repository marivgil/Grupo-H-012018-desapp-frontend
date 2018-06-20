import { Component, OnInit } from '@angular/core';
import { Vehicle } from "../../interfaces/vehicle.interface";
import { User } from '../../interfaces/user.interface';
import { UserService } from "../../services/user.service";
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { IMyDrpOptions } from 'mydaterangepicker';
import { PostsService } from '../../services/posts.service';
import { Http } from '@angular/http';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent {

  vehicle: Vehicle;
  user: User;
  forma: FormGroup;

// Inicializaciones para calendario
date = new Date();

myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd.mm.yyyy',
    disableUntil: {
          year: this.date.getFullYear(),
            month: this.date.getMonth() + 1,
            day: this.date.getDate()
    },
    editableDateRangeField : false,
    openSelectorOnInputClick: true
};


// Inicializaciones para mapas
  zoom: number = 15;
  // Start position
  lat: number = -34.603418;
  lng: number = -58.381592;

  marker: any;
  returnMarkers: any[] = [];


  constructor(private _userService: UserService,
              private _postService: PostsService,,
              private _router: Router) {

    this.vehicle = this._postService.postCar;
    this.user = this._userService.userBD;

    this.forma = new FormGroup({
      'phone': new FormControl('',      [Validators.required]),
      'costPerDay': new FormControl('', [Validators.required]),
      'pickUpCoord': new FormGroup({
                                    'lat': new FormControl(),
                                    'lng': new FormControl()
                                  },    Validators.required),
      'returnMarkers': new FormArray( [] , Validators.required),
      'dateRange': new FormControl()
    });
   }

   
   mapClicked($event: any) {
     this.marker = {
       name: 'Untitled',
       lat: $event.coords.lat,
       lng: $event.coords.lng,
       draggable: false
      };
      
    // this.forma.patchValue({
      //   capacity: this.vehicle.capacity,
    //   type: this.vehicle.type,
    //   description: this.vehicle.description
    // });
    this.forma.controls['pickUpCoord'].patchValue({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
  
  mapReturnClicked($event) {
    
    let marker = new FormGroup({
      'lat': new FormControl($event.coords.lat),
      'lng': new FormControl($event.coords.lng)
    });
    (<FormArray>this.forma.controls['returnMarkers']).push(marker);
    let m = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    };
    this.returnMarkers.push(m);
  }
  
  volverAHome() {
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

  post() {
    let sinceDate: string = this.forma.value.dateRange.beginDate.year + "-0" +
                    this.forma.value.dateRange.beginDate.month + "-" +
                    this.forma.value.dateRange.beginDate.day;
    let untilDate: string = this.forma.value.dateRange.endDate.year + "-0" +
                    this.forma.value.dateRange.endDate.month + "-" +
                    this.forma.value.dateRange.endDate.day;
    let costPerDay: number = this.forma.value.costPerDay;
    let vehicle: number = this._postService.postCar.id;
    let phone: number = this.forma.value.phone;
    let pickLng: number = this.forma.value.pickUpCoord.lng;
    let pickLat: number = this.forma.value.pickUpCoord.lat;
    let ownerUser: string = this._userService.userProfile.email;

    console.log(this._postService.postCar);
    

    let post =  {
      "costPerDay": costPerDay,
      "sinceDate": sinceDate,
      "untilDate": untilDate,
      "vehicle": 1 ,
      "phone": phone,
      "pickUpCoord": {
          "lng": pickLng,
          "lat": pickLat
      },
      "returnCoords": [{
          "lng": pickLat,
          "lat": pickLng
      }],
      "ownerUser": ownerUser,
      "location": "Palermo"
  };

    // let post = {
    //    "costPerDay": costPerDay,
    //    "sinceDate": sinceDate,
    //    "untilDate": untilDate,
    //    "vehicle": vehicle,
    //    "phone": phone,
    //    "pickUpCoord": {
    //      "lng" : pickLng,
    //      "lat" : pickLat
    //    },
    //    "location": "Palermo",
    //    "ownerUser": ownerUser,
    //    "returnCoords": [{
    //     "lng" : pickLng,
    //     "lat" : pickLat
    //   }],
    //  };

     console.log(post);

      this._postService.createPost(post).subscribe(res => {
        console.log(res);
        this._router.navigate["post", res.id];
      });
  }
}
