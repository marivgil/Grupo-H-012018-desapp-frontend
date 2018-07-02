import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styles: []
})
export class ReservationsComponent implements OnInit {

  post;
  reservation;
  cost: number[];
  scores: number[];
  url;
  forma;
  backup;

  constructor(private _reservations: ReservasService,
              private _post: PostsService,
              private _user: UserService,
              private router: Router) {
    this.url = this.router.routerState.snapshot.url;

    switch (this.url) {
      case "/reservasParaConfirmar" :
                  this._reservations.getAllPendingOwnerReservations(localStorage.getItem('email'))
                                          .subscribe((res) => {
                                              this.reservation = res;
                                              this.calculateCost(res);
                                              this.calculateScores(res);
                                              console.log(this.scores);
                                              console.log(res);
                                              });
                                          break;
     case "/misReservas":
                  this._reservations.getAllPendingTenantReservations(localStorage.getItem('email'))
                                          .subscribe((res) => {
                                              this.reservation = res;
                                              this.backup = res;
                                              this.calculateCost(res);
                                              console.log(res);
                                          });
                                          break;
    }// fin switch

    this.forma = new FormGroup({
     'filter': new FormControl('TODOS')
    });
  }// fin constructor

  ngOnInit() {
    this.forma.get('filter').valueChanges.subscribe( val => {
      switch ( val ) {
        case 'TODOS': this.reservation = this.backup; break;
        default : this.reservation = this.backup.filter(x => x.statusReservation === val ); break;
      }
    });
  }

  calculateScores(res) {
    this.scores = res.map((x) => {
      switch (x.tenantUser.scores.length) {
        case 0:
          return 3;
        default:
          return this.calculateOneScore(x.tenantUser.scores);
      }
    });
  }

  calculateOneScore(scores) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    return scores.reduce(reducer, 0);
  }

  calculateCost(res) {
    this.cost = res.map(function(x) {
      let fecha1 = moment(x.post.sinceDate);
      let fecha2 = moment (x.post.untilDate);
      return ((fecha2.diff(fecha1, 'days')) + 1) * x.post.costPerDay;
     });
  }

  confirmReservation(id, idx) {
    this._reservations.confirmReservation(id).subscribe((res) => {
      this.reservation.splice(idx, 1);
      console.log("Reserva confirmada!");
    });
  }

  rejectReservation(id, idx) {
    this._reservations.rejectReservation(id).subscribe((res) => {
      this.reservation.splice(idx, 1);
      console.log("Reserva rechazada!");
    });
  }

  goBack() {
    this.router.navigate(['account']);
  }

}
