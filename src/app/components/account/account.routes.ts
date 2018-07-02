import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { ReservationsComponent } from '../reservations/reservations.component';
import { RentalsComponent } from '../rentals/rentals.component';


const accountRoutes: Routes = [
    {
        path: 'cuenta',
        component: AccountComponent,
        canActivate: [AuthGuardService],
        children: [
            {
                path: 'reservasParaConfirmar',
                component: ReservationsComponent,
                canActivate: [AuthGuardService]},
            {
                path: 'misReservas',
                component: ReservationsComponent,
                canActivate: [AuthGuardService]},
            {
                path: 'alquileresDeMisAutos',
                component: RentalsComponent,
                canActivate: [AuthGuardService]},
            {
                path: 'alquileresDeOtrosAutos',
                component: RentalsComponent,
                canActivate: [AuthGuardService]}
        ]},
];

export const ACCOUNT_ROUTES = RouterModule.forChild( accountRoutes );
