import { NgModule } from "@angular/core";

import { ReservationsComponent } from "../reservations/reservations.component";
import { RentalsComponent } from "../rentals/rentals.component";
import { ACCOUNT_ROUTES } from "./account.routes";
import { AccountComponent } from "./account.component";
import { AuthGuardService } from "../../services/auth-guard.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ImagenPipe } from "../../pipes/imagen.pipe";
import { AgmCoreModule } from "@agm/core";
import { NeutronRatingModule } from "neutron-star-rating";
import { TranslateModule } from "ng2-translate";



@NgModule({
    declarations: [
       AccountComponent,
       ReservationsComponent,
       RentalsComponent,
       ImagenPipe
    ],
    exports: [
        ReservationsComponent,
        RentalsComponent,
        AccountComponent,
        ImagenPipe
    ],
    providers: [
        AuthGuardService
    ],
    imports: [
        ACCOUNT_ROUTES,
        FormsModule,
        CommonModule,
        NeutronRatingModule,
        TranslateModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE'
          }),
        ReactiveFormsModule
    ]
})

export class AccountModule { }
