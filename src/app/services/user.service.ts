import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  users:User[]= [{
      cuil:27654783980,
      isEnable:true,
      reputation:4.5,
      credit:380,
      vehicles:[]  
    },{
      cuil:87654387659,
      isEnable:true,
      reputation:5,
      credit:390,
      vehicles:[{
        vehicleType:"AUTO",
        capacity: 4,
        description: "No podemos determinar su año de fabricación... Ni en donde acabará. Hasta podria destruirse antes de haberse construido!",
        photos:["https://cdn.tn.com.ar/sites/default/files/styles/1366x765/public/2016/10/20/delorean-apertura_0.jpg"]
      }]  
    }];

  constructor() { }

  getUsers(){
    return this.users;
  }

  getUser(){
    return this.users[0];
  }

  getUserWithCar(){
    return this.users[1];
  }
}
