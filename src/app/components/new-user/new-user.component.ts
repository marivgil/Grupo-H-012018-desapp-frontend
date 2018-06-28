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
  url: string;


  constructor(private _auth: AuthService,
              private _user: UserService,
              private router: Router ) {

    this.url = this.router.routerState.snapshot.url;

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

    if (!this._user.nuevoUsuario) {
        this.cargarFormExistentUser();
     } else {
      $('#signUpModal').modal({
        backdrop: 'static',
        keyboard: false
      });
       this.cargarFormNewUser();
       this.map = true;
     }
  }

  private cargarFormNewUser() {
    this.forma.patchValue({
      email: this._user.userProfile.email,
      name: this._user.userProfile.given_name,
      surname: this._user.userProfile.family_name,
    });
  }

  private cargarFormExistentUser() {

   this.forma.patchValue({
        email: this._user.userProfile.email,
        name: this._user.userBD.name,
        surname: this._user.userBD.surname,
        address: this._user.userBD.address
   });
   this.forma.controls['CUIL'].patchValue({
     prefix: this._user.userBD.cuil.toString().substring(0, 2) ,
     DNI: this._user.userBD.cuil.toString().substring(2, 10),
     suffix: this._user.userBD.cuil.toString().substring(10, 11),
   });

   }

  public registerMe() {
    let cuil = this.forma.value.CUIL.prefix.toString() +
               this.forma.value.CUIL.DNI.toString() +
               this.forma.value.CUIL.suffix.toString() ;
               console.log(this.forma.value.CUIL.prefix);
               console.log(this.forma.value.CUIL.DNI);
               console.log(this.forma.value.CUIL.suffix);
               console.log(cuil);

    if (this._user.nuevoUsuario) {

      let user = {
        address: this.forma.value.address,
        name: this.toTitleCase(this.forma.value.name),
        email: this._user.userProfile.email,
        userName: null,
        cuil: cuil,
        surname: this.toTitleCase(this.forma.value.surname)
      };
      console.log(user);

      this._user.createUser(user).subscribe(res => {
        this._user.userBD = res;
        $('#signUpModal').modal('hide');
        this.marker = undefined;
        this._user.nuevoUsuario = false;
        this.router.navigate(['home']);
       });
     } else {
        let user = {
          address: this.forma.value.address,
          name: this.toTitleCase(this.forma.value.name),
          status: this._user.userBD.status,
          email: this._user.userProfile.email,
          userName: null,
          cuil: cuil,
          account: this._user.userBD.account,
          scores: this._user.userBD.scores,
          surname: this.toTitleCase(this.forma.value.surname)
         };

        this._user.editUser(user).subscribe(res => {
                this.modificarUsuarioBD(user);
                $('#signUpModal').modal('hide');
                this.marker = undefined;
        });
      }
     }



  private modificarUsuarioBD(user) {
    this._user.userBD.name = user.name;
    this._user.userBD.surname = user.surname;
    this._user.userBD.cuil = user.cuil;
    this._user.userBD.address = user.address;
   }

  public openMap() {
    this.map = true;
   }

  public mapClicked($event: any) {
     this.marker = {
       lat: $event.coords.lat,
       lng: $event.coords.lng,
       draggable: false
      };

      let geocoder = new google.maps.Geocoder();
      let origin1 = new google.maps.LatLng($event.coords.lat, $event.coords.lng);
      geocoder.geocode( { location: origin1 } , (results, status) =>  {
      // tslint:disable-next-line:triple-equals
      if (status == 'OK') {
        this.forma.patchValue({
          address: results[0].formatted_address });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
   }

   public closeModal() {
    if (this._user.nuevoUsuario) {
      this._user.nuevoUsuario = false;
      this._auth.logout();
    }

    $('#signUpModal').modal('hide');
   }


   private toTitleCase = (phrase) => {
    return phrase
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
