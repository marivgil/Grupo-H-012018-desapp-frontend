import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UserService {

  users:User[]= [{
      cuil:27654783980,
      isEnable:true,
      reputation:4.5,
      credit:380
    }];

  constructor() { }

  getUsers(){
    return this.users;
  }

  getUser(){
    return this.users[0];
  }
}
