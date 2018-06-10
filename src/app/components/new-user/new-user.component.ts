import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';


declare var $;
@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})

export class NewUserComponent implements OnInit {

  forma: FormGroup;
  user: any;

  constructor(private _auth: AuthService,
              private _user: UserService,
              private router: Router) {

    this.forma = new FormGroup({
      'CUIL': new FormGroup({
            'prefix': new FormControl  ('', [Validators.required, Validators.pattern('[0-9]{2}')]),
            'DNI': new FormControl     ('', [Validators.required, Validators.pattern('[0-9]{8}')]),
            'suffix': new FormControl  ('', [Validators.required, Validators.pattern('[0-9]{1}')]),
      }),
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'address': new FormGroup({
            'street': new FormControl  ('', Validators.required),
            'number': new FormControl  ('', [Validators.required, Validators.pattern('[0-9]*')]),
      }),
      'email': new FormControl('', Validators.required)// la validacion de email lo hace auth0!!!!
    });
    console.log (this._auth.userBD.name);

    this.forma.patchValue({
        email: this._auth.userProfile.email,
        name: this._auth.userBD.name,
        surname: this._auth.userBD.surname
    });
    console.log( this._auth.userBD.cuil.toString().substring(10, 11));
    this.forma.controls['CUIL'].patchValue({
      prefix: this._auth.userBD.cuil.toString().substring(0, 2) ,
      DNI: this._auth.userBD.cuil.toString().substring(2, 10),
      suffix: this._auth.userBD.cuil.toString().substring(10, 11),
    });
   }

   ngOnInit() { }

   registerMe() {

    let cuil = this.forma.value.CUIL.prefix +
               this.forma.value.CUIL.DNI +
               this.forma.value.CUIL.suffix ;

    let user = {
      address: this._auth.userBD.address,
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
            $('#nameModal').modal('hide');
    });
   }

   modificarUsuarioBD(user) {
    this._auth.userBD.name = user.name;
    this._auth.userBD.surname = user.surname;
    this._auth.userBD.cuil = user.cuil;
   }
}
