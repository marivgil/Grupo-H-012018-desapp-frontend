import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ReservasService } from '../../services/reservas.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html'
})
export class RentalsComponent implements OnInit {

  rentals;
  url;
  forma;

  constructor(private _reservations: ReservasService,
              private _user: UserService,
              private router: Router) {
    this.url = this.router.routerState.snapshot.url;

    switch (this.url) {
      case("/alquileresDeMisAutos"):
                              this._reservations.getAllOwnerRentals(this._user.userProfile.email)
                                                .subscribe((res) => {
                                                            console.log(res);
                                                            this.rentals = res;
                              }); break;

      case("/alquileresDeOtrosAutos"):
                              this._reservations.getAllTenantRentals(this._user.userProfile.email)
                                                .subscribe((res) => {
                                                            console.log(res);
                                                            this.rentals = res;
                                                });
    } // fin switch
  } // fin constructor

  ngOnInit() {
    this.forma = new FormGroup({
      'score': new FormControl('3', Validators.required),
      'comment': new FormControl('', Validators.required)
    });
  }

  confirmCarPickUpOwner(id, idx) {
    this._reservations.confirmRentalLikeOwner(id).subscribe((res) => {
      console.log(res);
    });
  }

  confirmCarPickUpTenant(id, idx) {
    this._reservations.confirmRentalLikeTenant(id).subscribe((res) => {
      console.log(res);
    });
  }

  confirmReturnCarOwner(id, idx) {
     this._reservations.confirmReturnLikeOwner(id, this.forma.value.score, this.forma.value.comment).subscribe((res) => {
       console.log(res);
     });
  }

  confirmReturnCarTenant(id, idx) {
    this._reservations.confirmReturnLikeTenant(id, this.forma.value.score, this.forma.value.comment). subscribe((res) => {
      console.log(res);
    });
  }

  onRatingClicked($event) {
    this.forma.patchValue({
      'score': $event
    });
  }
}
