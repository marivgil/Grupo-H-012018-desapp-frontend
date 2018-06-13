import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

declare var $;
@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styles: []
})
export class CreditComponent implements OnInit {

  forma: FormGroup;

  constructor(private _user: UserService) { }

  ngOnInit() {

      this.forma = new FormGroup({
        'credit': new FormControl(this._user.userBD.account, Validators.required)
      });
  }

  addCredit( ) {
    if ( this.forma.value.credit === this._user.userBD.account) {
      this.closeModal();
    } else {
      this._user.addCredit(this.forma.value.credit). subscribe( res => {
        this._user.userBD = res;
        this.closeModal();
      });
    }
  }

  closeModal() {
    $('#addCreditModal').modal('hide');
  }

  addOne() {
    this.forma.patchValue({credit: this.forma.value.credit + 1});
    console.log(this.forma.value.credit);
  }

}
