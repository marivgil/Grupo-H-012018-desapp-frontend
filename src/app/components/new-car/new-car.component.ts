import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

@Component({
  selector: 'app-new-car',
  templateUrl: './new-car.component.html'
})
export class NewCarComponent {

  usuario:any={
    capacity:20,
    type:"AUTO",
    description:"Es un auto de carroceria muy nueva. Impecable y digno de ver"
  }

  forma:FormGroup;

  constructor() {

    this.forma= new FormGroup({
      'capacity': new FormControl('2',  [Validators.required
                                        ,CustomValidators.range([2, 25]) 
                                        ,Validators.pattern("[0-9]*")]
                                  ),
      'type': new FormControl('',       Validators.required),

      'description': new FormControl('',[Validators.required
                                        ,CustomValidators.rangeLength([30, 200])]
                                    )
    })

    this.forma.setValue( this.usuario );
   }

   guardarCambios(){
     console.log(this.forma); 
     this.forma.reset();    
   }



}
