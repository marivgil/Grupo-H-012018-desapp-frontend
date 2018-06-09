import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Http } from '@angular/http';
import { URL_SERVICIO } from '../config';

@Injectable()
export class UserService {

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
  constructor(private http: Http) { }

  getUser(mail: string) {
    let url: string = URL_SERVICIO + this.extensionUrl + "findUserByEmail/" + mail ;

   return this.http.get(url);
  }

//  http://localhost:8080/desapp-grouph-backend/rest/servicesUsers/findUserByEmail/a.redonda89@gmail.com
}
