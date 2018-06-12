import { URL_SERVICIO } from '../config';

import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Vehicle } from '../interfaces/vehicle.interface';

@Injectable()
export class VehicleService {

  constructor(private _http: Http) { }

  editedCar;
  indexEditedCar;

  extensionUrl: string = 'desapp-grouph-backend/rest/servicesVehicle/';


  addCar(vehicle: Vehicle): Observable<Response> {

     let url = URL_SERVICIO + this.extensionUrl + 'createVehicle';
     let header = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions ( { headers: header });

     return this._http.post(url, vehicle, options)
                      .map((res: any) => {
                        return res.json();
                      });
   }

  editCar(vehicle: Vehicle): Observable<Response> {

    let url = URL_SERVICIO + this.extensionUrl + 'updateVehicle';
     let header = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions ( { headers: header });

     return this._http.put(url, vehicle, options)
                      .map((res: any) => {
                        return res._body;
                      });
  }

  deleteCar(id: number): Observable<Response> {
    let url = URL_SERVICIO + this.extensionUrl + 'deleteVehicle/' + id;
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions ( { headers: header });

     return this._http.delete(url, options)
                      .map((res: any) => {
                        return res._body;
                      });
  }


}
