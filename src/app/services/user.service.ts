import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Http, RequestOptions, Headers } from '@angular/http';
import { URL_SERVICIO } from '../config';
import { AuthService } from './auth.service';
import { VehicleService } from './vehicle.service';

@Injectable()
export class UserService {

  userProfile ;
  userBD: any;

  nuevoUsuario: boolean = false;

  extensionUrl = "desapp-grouph-backend/rest/servicesUsers/";

  user: User; /* = [{
      cuil: 27654783980,
      isEnable: false,
      reputation: 4.5,
      credit: 380,
      vehicles: [],
    }, {
      cuil: 87654387659,
      isEnable: true,
      reputation: 5,
      credit: 390,
      vehicles: [{
        type: "AUTO",
        capacity: 4,
        owner: "a.redonda",
        description: "No podemos determinar su año de fabricación... Ni en donde acabará. Hasta podria destruirse antes de haberse construido!",
        photos: ["https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2016/10/20/delorean-apertura_0.jpg"]
      }]
    }];
*/
  constructor(private http: Http,
              private _vehicle: VehicleService) { }

  getUser(mail: string) {
    let url: string = URL_SERVICIO + this.extensionUrl + "findUserByEmail/" + mail ;

   return this.http.get(url);
  }

  editUser(user: any) {
    let url: string = URL_SERVICIO + this.extensionUrl + "updateUser";
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions ( { headers: header });

    return this.http.put(url, user, options)
                    .map((res: any) => {
                              return res.json();
    });
  }

  createUser(user: any) {
    let url: string = URL_SERVICIO + this.extensionUrl + "createUser";
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions ( { headers: header });

    return this.http.post(url, user, options)
                    .map((res: any) => {
                              return res.json();
    });
  }

  public deleteCarLocale(i: number) {
    this.userBD.vehicles.splice(i, 1);
  }

  public replaceCar( car: any ) {
    this.userBD.vehicles.splice(this._vehicle.indexEditedCar , 1, car);
  }

  public addCredit(montoTotal) {
     let monto = montoTotal - this.userBD.account;
     let url = URL_SERVICIO + this.extensionUrl + 'addCredit/' + monto + '/' + this.userProfile.email;
     let header = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions ( { headers: header });

        return this.http.put(url, {}, options)
                     .map((res: any) => {
                              return res.json();
                     });
     }
}

