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
    this.forma= new FormGroup({
      'CUIL': new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
      'name': new FormControl('', Validators.required),
      'surname': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'email': new FormControl('ejemplo@ejemplo.com.ar', Validators.required)//la validacion de email lo hace auth0!!!!
    })
   }

   registerMe(){}


}
