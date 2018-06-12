import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

declare var google;
declare var $;
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})

export class NewUserComponent implements OnInit {

  zoom: number = 10;
  // Start position
  lat: number = -34.603418;
  lng: number = -58.381592;
  marker: any ;

  forma: FormGroup;
  user: any;
  map: boolean = false;


  constructor(private _auth: AuthService,
              private _user: UserService,
              private router: Router ) {

    this.forma = new FormGroup({
      'CUIL': new FormGroup({
            'prefix': new FormControl  ('', [Validators.required, Validators.pattern('[0-9]{2}')]),
            'DNI': new FormControl     ('', [Validators.required, Validators.pattern('[0-9]{8}')]),
            'suffix': new FormControl  ('', [Validators.required, Validators.pattern('[0-9]{1}')]),
      }),
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required)// la validacion de email lo hace auth0!!!!
    });

   }


   ngOnInit() {
    $('#signUpModal').modal({
           backdrop: 'static',
           keyboard: false
         });

    if (!this._auth.nuevoUsuario) {
        this.cargarFormExistentUser();
     } else {
       this.cargarFormNewUser();
       this.map = true;
     }
  }

  cargarFormNewUser() {
    console.log(this._auth.userProfile);
    this.forma.patchValue({
      email: this._auth.userProfile.email,
      name: this._auth.userProfile.given_name,
      surname: this._auth.userProfile.family_name,
    });
  }

  cargarFormExistentUser() {

   this.forma.patchValue({
       email: this._auth.userProfile.email,
       name: this._auth.userBD.name,
       surname: this._auth.userBD.surname,
       address: this._auth.userBD.address
   });
   this.forma.controls['CUIL'].patchValue({
     prefix: this._auth.userBD.cuil.toString().substring(0, 2) ,
     DNI: this._auth.userBD.cuil.toString().substring(2, 10),
     suffix: this._auth.userBD.cuil.toString().substring(10, 11),
   });

   }

   registerMe() {
    let cuil = this.forma.value.CUIL.prefix +
               this.forma.value.CUIL.DNI +
               this.forma.value.CUIL.suffix ;

    if (this._auth.nuevoUsuario) {

      let user = {
        address: this.forma.value.address,
        name: this.forma.value.name,
        email: this._auth.userProfile.email,
        userName: null,
        cuil: cuil,
        surname: this.forma.value.surname
      };


      this._user.createUser(user).subscribe(res => {
        this._auth.userBD = res;
        $('#signUpModal').modal('hide');
        this.marker = undefined;
        this._auth.nuevoUsuario = false;
        this.router.navigate(['home']);
       });
     } else {
        let user = {
          address: this.forma.value.address,
          name: this.forma.value.name,
          status: this._auth.userBD.status,
          email: this._auth.userProfile.email,
          userName: null,
          cuil: cuil,
          account: this._auth.userBD.account,
          scores: this._auth.userBD.scores,
          surname: this.forma.value.surname
         };

        this._user.editUser(user).subscribe(res => {
                this.modificarUsuarioBD(user);
                $('#signUpModal').modal('hide');
                this.marker = undefined;
        });
      }
     }



   modificarUsuarioBD(user) {
    this._auth.userBD.name = user.name;
    this._auth.userBD.surname = user.surname;
    this._auth.userBD.cuil = user.cuil;
    this._auth.userBD.address = user.address;
   }

   openMap() {
    this.map = true;
   }

   mapClicked($event: any) {
     this.marker = {
       lat: $event.coords.lat,
       lng: $event.coords.lng,
       draggable: false
      };

      let geocoder = new google.maps.Geocoder();
      let origin1 = new google.maps.LatLng($event.coords.lat, $event.coords.lng);
      geocoder.geocode( { location: origin1 } , (results, status) =>  {
      if (status == 'OK') {
        this.forma.patchValue({
          address: results[0].formatted_address });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
   }

   closeModal() {
    if (this._auth.nuevoUsuario) {
      this._auth.nuevoUsuario = false;
      this._auth.logout();
    }

    $('#signUpModal').modal('hide');
   }
}
