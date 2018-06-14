import { AbstractControl } from "@angular/forms";

export function isLink (control: AbstractControl): {[key: string]: any} {
    if (control.value != null || typeof control.value === 'string' && control.value.length !== 0) {
      return (/http:\/\//g.exec(name) !== null || /https:\/\//g.exec(name) !== null) ? null : { 'stark': true };
    } else {
      return null;
    }
  }
