import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

import { Vehicle } from "../../interfaces/vehicle.interface"

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html'
})
export class NewCarComponent {

  vehicle:Vehicle;

  forma:FormGroup;

  constructor(private router:Router) {

    this.forma= new FormGroup({
      'capacity': new FormControl('2',  [Validators.required
                                        ,CustomValidators.range([2, 25]) 
                                        ,Validators.pattern("[0-9]*")]
                                  ),
      'type': new FormControl('',       Validators.required),

      'description': new FormControl('',[Validators.required
                                        ,CustomValidators.rangeLength([30, 200])]
                                    ),
      'photos': new FormArray([
        new FormControl('Correr')
      ]) 
    })

 /*   this.forma.valueChanges.subscribe(
      data =>{
        console.log(data);
      }
    )
  */
  }

  addPhoto(){
    (<FormArray>this.forma.controls['photos']).push(
      new FormControl('', Validators.required)
    )   
  }

  deletePhoto(photo){
    (<FormArray>this.forma.controls['photos']).removeAt(photo);
  }

   saveChanges(){
     console.log(this.forma);
     this.router.navigate(['/tusAutos']);
     //this.forma.reset();    
   }

   lala(){}



}
