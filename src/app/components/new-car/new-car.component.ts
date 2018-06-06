import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

import { Vehicle } from "../../interfaces/vehicle.interface";
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html'
})
export class NewCarComponent implements OnInit {

  vehicle: Vehicle;
  user: any;
  userBD: any;

  forma: FormGroup;

  constructor(private router: Router,
              private _vehicle: VehicleService,
              private _auth: AuthService) {

                this._auth.getProfile((err, res) => {
                  this.user = res;
                });
              }


  ngOnInit() {

    this.forma = new FormGroup({
      'capacity': new FormControl('2',  [Validators.required
                                        , CustomValidators.range([2, 25])
                                        , Validators.pattern("[0-9]*")]
                                  ),
      'type': new FormControl('AUTO',       Validators.required),

      'description': new FormControl('', [ Validators.required
                                        , CustomValidators.rangeLength([30, 200])]
                                    ),
      'photos': new FormArray([ ])
    });

 /*   this.forma.valueChanges.subscribe(
      data =>{
        console.log(data);
      }
    )
  */
  }

  addPhoto() {
    (<FormArray>this.forma.controls['photos']).push(
      new FormControl('', Validators.required)
    );
  }

  deletePhoto(photo) {
    (<FormArray>this.forma.controls['photos']).removeAt(photo);
  }

  saveChanges() {
     console.log(this.forma);
     let vehicle = {
      type: this.forma.controls['type'].value,
      capacity: this.forma.controls['capacity'].value,
      description: this.forma.controls['description'].value,
      photos: this.forma.controls['photos'].value,
      owner: this.user.email
     };
     this._vehicle.addCar(vehicle).subscribe(res => {
       this.userBD = res;
       console.log(res);
     });
//     this.router.navigate(['/tusAutos']);
     // this.forma.reset();
   }
}


// {
//   "type": "AUTO",
//   "owner": "a.redonda89@gmail.com",
//   "description": "A default description, a little bit longer because is not allowed a shorter description",
//   "capacity": 10,
//   "photos": [
//       "https://cdn.wallpaperjam.com/content/images/9e/fd/9efd172a5aea57e895acf503100b148d67c709a6.jpg"
//   ]
// }
