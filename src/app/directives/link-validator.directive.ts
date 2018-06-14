import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';

const LINK_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => LinkValidatorDirective),
  multi: true
};

@Directive({
  selector: '[linkValidator][ngModel],[linkValidator][formControl],[linkValidator][formControlName]',
  providers: [ LINK_VALIDATOR ],
})
export class LinkValidatorDirective implements Validator {

  validate(control: AbstractControl) : {[key: string]: any} {
    if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {
      return this.isLink(control.value) ? null : { 'stark': true };
      // si el stark es legitimo 
    } else {
      return null;
    }
  }

  private isLink (name: string): boolean {
    return /http:\/\//g.exec(name) !== null||/https:\/\//g.exec(name) !== null ;
  }
}


