import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../../services/reservas.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-rentals',
  templateUrl: './rentals.component.html'
})
export class RentalsComponent implements OnInit {

  rentals;

  constructor(private _reservations: ReservasService,
              private _user: UserService) {

     this._reservations.getAllOwnerRentals(this._user.userProfile.email).subscribe((res) => {
                        console.log(res);
                        this.rentals = res;
    });
  }

  ngOnInit() {
  }

}
