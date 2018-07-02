import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';
import { NeutronRatingModule } from 'neutron-star-rating';
import { ReservasService } from '../../services/reservas.service';

declare var $;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

   usuarioEditado;
   editar: boolean = false;
   spin: boolean = false;
   success: boolean = null;
   error: boolean = null;

   constructor(public auth: AuthService,
               public _user: UserService,
               private _reservas: ReservasService) {
              }

   editUser() {
      $('#signUpModal').modal({ });
   }

   addCredit() {
    $('#addCreditModal').modal({ });
   }

   sendMonthlyReport() {
     this.success = null;
     this.error = null;
     this.spin = true;
     this._reservas.sendMonthlyReport(this._user.userProfile.email).subscribe((res) => {
       if (res.status === 200) {
         this.spin = false;
         this.success = true;
        alert("Mail enviado");
       } else {
         this.spin = false;
         this.error = true;
         alert("Por favor, intente nuevamente en unos instantes");
       }
       console.log(this.spin);
     });
   }
/*{
  "sub": "google-oauth2|106572254188915518115",
  "given_name": "Analía",
  "family_name": "Redonda",
  "nickname": "a.redonda89",
  "name": "Analía Redonda",
  "picture": "https://lh3.googleusercontent.com/-UlZYyw3K9fk/AAAAAAAAAAI/AAAAAAAAAz4/pcNGPnRW1BE/photo.jpg",
  "gender": "female",
  "locale": "es-419",
  "updated_at": "2018-04-18T20:17:27.397Z",
  "email": "a.redonda89@gmail.com",
  "email_verified": true
}*/
}
