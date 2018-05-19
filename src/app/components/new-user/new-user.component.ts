import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})
export class NewUserComponent {

  forma: FormGroup;
  user: any;

  constructor(private _auth: AuthService) {
    if (this._auth.userProfile) {
      this.user = this._auth.userProfile;
    } else {
      this._auth.getProfile((err, profile) => {
        this.user = profile;
      });
    }    

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
      'email': new FormControl('ejemplo@ejemplo.com.ar', Validators.required)// la validacion de email lo hace auth0!!!!
    });
   }

   registerMe() {
     console.log(this.forma);
   }


}
