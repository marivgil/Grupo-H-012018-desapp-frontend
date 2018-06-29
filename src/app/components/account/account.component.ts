import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: []
})
export class AccountComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  goToReservationsToBeConfirmed() {
    this._router.navigate(['/reservasParaConfirmar']);
  }

  goToMyReservations() {
    this._router.navigate(['/misReservas']);
  }

  goToRentalsLikeOwner() {
    this._router.navigate(['/alquileresDeMisAutos']);
  }

  goToRentalsLikeTenant() {
    this._router.navigate(['/alquileresDeOtrosAutos']);
  }
}
