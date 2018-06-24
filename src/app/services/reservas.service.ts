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



}
