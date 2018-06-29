import { Injectable } from '@angular/core';
import { URL_SERVICIO } from '../config';
import { Http } from '@angular/http';

@Injectable()
export class ReservasService {

  extensionUrl: string = "desapp-grouph-backend/rest/servicesReservation/";

  constructor( private http: Http ) { }

  bookPost(id, mail, sinceDate, untilDate) {
    let url = URL_SERVICIO + this.extensionUrl + "createReservation/" + id + "/" + mail + "/" + sinceDate + "/" + untilDate;
    return this.http.post(url, {} )
                        .map((res: any) => {
                            return res.json();
                        });
  }

  getAllPendingOwnerReservations(mail) {
    let url = URL_SERVICIO + this.extensionUrl + "allOwnerPendingReservations/" + mail;
    return this.http.get(url)
            .map((res: any) => {
                return res.json();
    });
  }

  confirmReservation(id) {
    let url = URL_SERVICIO + this.extensionUrl + "confirmedReservation/" + id;
    return this.http.put(url, {} )
                    .map((res) => {
                      return res;
                    });
  }

  rejectReservation(id) {
    let url = URL_SERVICIO + this.extensionUrl + "rejectReservation/" + id;
    return this.http.put(url, {} )
                    .map((res) => {
                      return res;
                    });
  }

  getAllPendingTenantReservations(mail) {
    let url = URL_SERVICIO + this.extensionUrl + "allTenantReservations/" + mail;
    return this.http.get(url)
            .map((res: any) => {
                return res.json();
    });
  }

  getAllOwnerRentals(mail) {
    let url = URL_SERVICIO + this.extensionUrl + "allOwnerRentals/" + mail;
    return this.http.get(url)
                    .map((res: any) => {
                      return res.json();
                    });
  }

  getAllTenantRentals(mail) {
    let url = URL_SERVICIO + this.extensionUrl + "allTenantRentals/" + mail;
    return this.http.get(url)
                    .map((res: any) => {
                      return res.json();
                    });
  }

  confirmRentalLikeOwner(idRental) {
    let url = URL_SERVICIO + this.extensionUrl + "confirmedRentalByOwner/" + idRental;
    return this.http.put(url, {})
                    .map((res: any) => {
                      return res;
                    });
  }

  confirmRentalLikeTenant(idRental) {
    let url = URL_SERVICIO + this.extensionUrl + "confirmedRentalByTenant/" + idRental;
    return this.http.put(url, {})
                    .map((res: any) => {
                      return res;
                    });
  }

  confirmReturnLikeTenant(idRental, score, comment) {
    let url = URL_SERVICIO + this.extensionUrl + "confirmedReturnByTenant/" + idRental + "/" + score + "/" + comment;
    return this.http.put(url, {})
                    .map((res) => {
                      return res;
                    });
  }

  confirmReturnLikeOwner(idRental, score, comment) {
    let url = URL_SERVICIO + this.extensionUrl + "confirmedReturnByOwner/" + idRental + "/" + score + "/" + comment;
    return this.http.put(url, {})
                    .map((res) => {
                      return res;
                    });
  }

}
