import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent} from './components/posts/posts.component';
import { YourOwnCarsComponent } from './components/your-own-cars/your-own-cars.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { AccountComponent } from './components/account/account.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarGuard } from './services/car.guard';
import { PostGuard } from './services/post.guard';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'encontraTuAutoIdeal', component: PostsComponent},
    {
        path: 'tusAutos',
        component: YourOwnCarsComponent,
        canActivate: [AuthGuardService]},
    { path: 'post/:id', component: PostComponent },
    {
         path: 'perfil',
         component: ProfileComponent,
         canActivate: [AuthGuardService]},
    {
        path: 'nuevoAuto',
        component: NewCarComponent,
        canActivate: [AuthGuardService]},
    {
        path: 'editarAuto',
        component: NewCarComponent,
        canActivate: [AuthGuardService, CarGuard]},
    {
        path: 'nuevoUsuario',
        component: NewUserComponent,
        canActivate: [AuthGuardService]},
    {
        path: 'nuevoPost',
        component: NewPostComponent,
        canActivate: [AuthGuardService, PostGuard]},
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
] ;

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
