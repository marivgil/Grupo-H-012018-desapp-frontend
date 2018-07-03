import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ReservasService } from '../../services/reservas.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

declare var $;

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html'
})
export class RentalsComponent implements OnInit {

  usuario;
  rentals;
  url;
  forma;
  reservationModal;
  cost;
  draggable = false;
  loading = false;

  constructor(private _reservations: ReservasService,
              private _user: UserService,
              private router: Router) {
    this.url = this.router.routerState.snapshot.url;
    this.cargarDatos();
  } // fin constructor

  ngOnInit() {
    this.forma = new FormGroup({
      'score': new FormControl('3', Validators.required),
      'comment': new FormControl('', Validators.required)
    });
  }

  cargarDatos() {
    switch (this.url) {
      case("/cuenta/alquileresDeMisAutos"):
                              this._reservations.getAllOwnerRentals(localStorage.getItem('email'))
                                                .subscribe((res) => {
                                                            console.log(res);
                                                            this.rentals = res;
                                                            this.calculateCost(res);
                              }); break;

      case("/cuenta/alquileresDeOtrosAutos"):
                              this._reservations.getAllTenantRentals(localStorage.getItem('email'))
                                                .subscribe((res) => {
                                                            console.log(res);
                                                            this.rentals = res;
                                                            this.calculateCost(res);
                                                });
    } // fin switch
  }

  calculateCost(res) {
    this.cost = res.map(function(x) {
      let fecha1 = moment(x.reservation.post.sinceDate);
      let fecha2 = moment (x.reservation.post.untilDate);
      return ((fecha2.diff(fecha1, 'days')) + 1) * x.reservation.post.costPerDay;
     });
  }

  confirmCarPickUpOwner(id, idx) {
    this.loading = true;
    this._reservations.confirmRentalLikeOwner(id).subscribe((res) => {
      this.loading = false;
      this.cargarDatos();
    });
  }

  confirmCarPickUpTenant(id, idx) {
    this.loading = true;
    this._reservations.confirmRentalLikeTenant(id).subscribe((res) => {
      this.loading = false;
      this.cargarDatos();
    });
  }

  confirmReturnCarOwner(id, idx) {
    this.loading = true;
     this._reservations.confirmReturnLikeOwner(id, this.forma.value.score, this.forma.value.comment).subscribe((res) => {
      this.loading = false;
      this.cargarDatos();
     });
  }

  confirmReturnCarTenant(id, idx) {
    this.loading = true;
    this._reservations.confirmReturnLikeTenant(id, this.forma.value.score, this.forma.value.comment). subscribe((res) => {
      this.loading = false;
      this.cargarDatos();
    });
  }

  onRatingClicked($event) {
    this.forma.patchValue({
      'score': $event
    });
  }


  verDatosDuenio( r ) {
    this._user.getUser(r.reservation.owner).subscribe((res) => {
      this.reservationModal = r ;
      this.usuario = res.json();
      $('#personalData').modal('show');
    });
  }

  verDatosCliente( r ) {
    this.reservationModal = r;
    this.usuario = r.reservation.tenantUser;
    $('#personalData').modal('show');
  }

}
