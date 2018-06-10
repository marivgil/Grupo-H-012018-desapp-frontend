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
   }

   ngOnInit() { }

   registerMe() {
     let user = {
       address: this._auth.userBD.address,
       name: this.forma.value.name,
       status: this._auth.userBD.status,
       email: this._auth.userProfile.email,
       userName: null,
       cuil: this._auth.userBD.cuil,
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
   }


// { PARA PUT DE USUARIO
//   "address": "Arredondo 1238",
//   "name": "Analia",
//   "status": true,
//   "email": "a.redonda89@gmail.com",
//   "userName": null,
//   "cuil": "1",
//   "account": 0,
//   "scores": [],
//   "surname": "Redonda"
// }


}
