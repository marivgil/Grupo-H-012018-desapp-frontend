import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from 'util';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router,
              private _auth: AuthService) { }

  ngOnInit() {
    console.log(this._auth.nuevoUsuario);
   }

  irATusAutos() {
    if (!this._auth.isAuthenticated()) {
      this._auth.login();
    } else {
    this._router.navigate(["tusAutos"]);
    }
  }

}
