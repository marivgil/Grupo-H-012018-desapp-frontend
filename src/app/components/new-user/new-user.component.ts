import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html'
})
export class NewUserComponent {

  forma:FormGroup;

  constructor() {
    this.forma = new FormGroup({
      'CUIL': new FormGroup({
            'prefix': new FormControl  ('27', [Validators.required, Validators.pattern('[0-9]{2}')]),
            'DNI': new FormControl     ('34940180', [Validators.required, Validators.pattern('[0-9]{8}')]),
            'suffix': new FormControl  ('4', [Validators.required, Validators.pattern('[0-9]{1}')]),
      }),
      'name': new FormControl('Analia', Validators.required),
      'surname': new FormControl('Redonda', Validators.required),
      'address': new FormGroup({
            'street': new FormControl  ('Arredondo', Validators.required),
            'number': new FormControl  ('1238', [Validators.required, Validators.pattern('[0-9]*')]),
      }),
      'email': new FormControl('ejemplo@ejemplo.com.ar', Validators.required)// la validacion de email lo hace auth0!!!!
    });
   }

   registerMe() {
     console.log(this.forma);
   }


}
