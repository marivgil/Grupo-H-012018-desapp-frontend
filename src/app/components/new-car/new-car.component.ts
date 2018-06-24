import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router, ActivatedRoute } from '@angular/router';
import { isLink } from '../../directives/isLink.validator';

import { Vehicle } from "../../interfaces/vehicle.interface";
import { VehicleService } from '../../services/vehicle.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html'
})
export class NewCarComponent implements OnInit {

  vehicle: Vehicle;
  forma: FormGroup;
  url: string;
  photos = [];

  constructor(private router: Router,
              private _vehicle: VehicleService,
              private _user: UserService,
              private fb: FormBuilder,
              private routing: ActivatedRoute) {

    this.url = this.router.routerState.snapshot.url;

    if (this.url === '/editarAuto') {
      this.vehicle = this._vehicle.editedCar;
    }
  }


  ngOnInit() {

    this.forma = new FormGroup({
      'capacity': new FormControl('2',  [Validators.required
                                        , CustomValidators.range([2, 25])
                                        , Validators.pattern("[0-9]*")]
                                  ),
      'type': new FormControl('AUTO',     Validators.required),

      'description': new FormControl('', [ Validators.required
                                        , CustomValidators.rangeLength([30, 200])]
                                    ),
      'photos': new FormArray([ ])
    });

    if (this.url === '/editarAuto') {
      this.forma.patchValue({
        capacity: this.vehicle.capacity,
        type: this.vehicle.type,
        description: this.vehicle.description
      });
      this.forma.setControl('photos', this.fb.array(this.vehicle.photos || []));
      this.photos = this.vehicle.photos;
    }


 /*   this.forma.valueChanges.subscribe(
      data =>{
        console.log(data);
      }
    )
  */
  }


  setearFoto(st: string) {
    this.photos.push(st);
  }


  addPhoto() {
    (<FormArray>this.forma.controls['photos']).push(
      new FormControl(undefined , [Validators.required])
    );
  }

  deletePhoto(photo) {
    (<FormArray>this.forma.controls['photos']).removeAt(photo);
  }

  saveChanges() {
     console.log(this.forma);
      if (this.url === '/nuevoAuto') {
        let vehicle = {
         type: this.forma.controls['type'].value,
         capacity: this.forma.controls['capacity'].value,
         description: this.forma.controls['description'].value,
         photos: this.forma.controls['photos'].value,
         owner: this._user.userProfile.email
        };
       this._vehicle.addCar(vehicle).subscribe(res => {
         this._user.userBD = res;
         console.log(res);
         this.router.navigate(['/tusAutos']);
         });
       } else {
         // EDITA AUTO
         let vehicle = {
           type: this.forma.controls['type'].value,
           capacity: this.forma.controls['capacity'].value,
           description: this.forma.controls['description'].value,
           photos: this.forma.controls['photos'].value,
           owner: this._user.userProfile.email,
           id: this._vehicle.editedCar.id,
          };
       this._vehicle.editCar(vehicle).subscribe( res => {
         this._user.replaceCar(vehicle);
         this.router.navigate(['/tusAutos']);
       });
       }
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
