import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html'
})
export class RentalsComponent implements OnInit {


  score = 5;
  comment = "Muy bueno todo";
  rentals;
  url;

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
    this._reservations.confirmReturnLikeOwner(id, this.score, this.comment).subscribe((res) => {
      console.log(res);
    });
  }

  confirmReturnCarTenant(id, idx) {
    this._reservations.confirmReturnLikeTenant(id, this.score, this.comment). subscribe((res) => {
      console.log(res);
    });
  }
}
