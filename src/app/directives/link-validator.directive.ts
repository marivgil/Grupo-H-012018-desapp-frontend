import { Directive, forwardRef } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS } from '@angular/forms';
import { isLink } from '../directives/isLink.validator';

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

  validate(control: AbstractControl): {[key: string]: any} {
    return isLink(control);
  }
}


