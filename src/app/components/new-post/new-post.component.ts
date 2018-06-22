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
import { VehicleService } from '../../services/vehicle.service';

declare var google;

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html'
})
export class NewPostComponent {

  vehicle: Vehicle;
  user: User;
  forma: FormGroup;
  pickAddress;
  retAddress;

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

  markerP: any;
  markerR: any;
  returnMarkers: any[] = [];


  constructor(private _userService: UserService,
              private _postService: PostsService,
              private _vehicle: VehicleService,
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
      'returnCoord': new FormGroup({
                                    'lat': new FormControl(),
                                    'lng': new FormControl()
                                  },    Validators.required),
      'dateRange': new FormControl()
    });
   }


   mapClicked($event: any) {
     this.pickAddress = "Buscando...";
     this.markerP = {
       name: 'Untitled',
       lat: $event.coords.lat,
       lng: $event.coords.lng,
       draggable: false
      };

    this.forma.controls['pickUpCoord'].patchValue({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });

    this.findAddress($event, "pickAddress");
  }

  mapReturnClicked($event) {
    this.retAddress = "Buscando...";
    this.markerR = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
     };

   this.forma.controls['pickUpCoord'].patchValue({
     lat: $event.coords.lat,
     lng: $event.coords.lng
   });

   this.findAddress($event, "retAddress");
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
    let beginMonth = this.forma.value.dateRange.beginDate.month;

    let endMonth = this.forma.value.dateRange.endDate.month;

    if (beginMonth < 10 ) {
      beginMonth = "0".concat(this.forma.value.dateRange.beginDate.month);
    }

    if (endMonth < 10 ) {
      endMonth = "0".concat(this.forma.value.dateRange.endDate.month);
    }

    let sinceDate: string = this.forma.value.dateRange.beginDate.year + "-" +
                    beginMonth + "-" +
                    this.forma.value.dateRange.beginDate.day;
    let untilDate: string = this.forma.value.dateRange.endDate.year + "-" +
                    endMonth + "-" +
                    this.forma.value.dateRange.endDate.day;
    let costPerDay: number = this.forma.value.costPerDay;
    let vehicle: number = this._postService.postCar.id;
    let phone: number = this.forma.value.phone;
    let pickLng: number = this.forma.value.pickUpCoord.lng;
    let pickLat: number = this.forma.value.pickUpCoord.lat;
    let ownerUser: string = this._userService.userProfile.email;

    let post =  {
      "costPerDay": costPerDay,
      "sinceDate": sinceDate,
      "untilDate": untilDate,
      "vehicle": vehicle ,
      "phone": phone,
      "pickUpCoord": {
          "lng": pickLng,
          "lat": pickLat
      },
      "returnCoords": {
          "lng": pickLat,
          "lat": pickLng
      },
      "ownerUser": ownerUser,
      "location": "Palermo"
  };

      this._postService.createPost(post).subscribe(res => {
        this._router.navigate(['post', res.id]);
      });
  }

  editCar() {
    this._vehicle.editedCar = this._postService.postCar;
    this._router.navigate(['editarAuto']);
  }

  changeCar() {
    this._router.navigate(["tusAutos"]);
  }

  findAddress($event, ref: string) {
    let geocoder = new google.maps.Geocoder();
    let origin1 = new google.maps.LatLng($event.coords.lat, $event.coords.lng);
    geocoder.geocode( { location: origin1 } , (results, status) =>  {
    if (status == 'OK') {
      switch (ref) {
        case "pickAddress":
          this.pickAddress = results[0].formatted_address;
          console.log(this.pickAddress);
          break;
        case "retAddress":
          this.retAddress = results[0].formatted_address;
          break;
        default:
          alert("No lo guarde en ningun lado!");
      }
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
  }
}
