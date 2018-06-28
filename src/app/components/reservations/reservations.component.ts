import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styles: []
})
export class ReservationsComponent implements OnInit {

  post;
  reservation;
  url;

  constructor(private _reservations: ReservasService,
              private _post: PostsService,
              private _user: UserService,
              private router: Router) {
    this.url = this.router.routerState.snapshot.url;

    switch (this.url) {
      case "/reservasParaConfirmar" :
                  this._reservations.getAllPendingOwnerReservations(this._user.userProfile.email)
                                          .subscribe((res) => {
                                              this.reservation = res;
                                              console.log(res);
                                              if (res.lenght > 1) {
                                                this._post.getPost(res[0].post).subscribe((log: any) => {
                                                    this.post = log.json();
                                                    console.log(log.json());
                                                });
                                              }

                                          }); break;
     case "/misReservas":
                  this._reservations.getAllPendingTenantReservations(this._user.userProfile.email)
                                          .subscribe((res) => {
                                              this.reservation = res;
                                              console.log(res);
                                              this._post.getPost(res[0].post).subscribe((log: any) => {
                                                  this.post = log.json();
                                                  console.log(log.json());
                                              });
                                          }); break;
    }// fin switch

  }// fin constructor

  ngOnInit() {
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

}
