import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent} from './components/posts/posts.component';
import { YourOwnCarsComponent } from './components/your-own-cars/your-own-cars.component';
import { PostComponent } from './components/post/post.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileComponent } from './components/profile/profile.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { NewUserComponent } from './components/new-user/new-user.component'
import { NewPostComponent } from './components/new-post/new-post.component';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'encontraTuAutoIdeal', component: PostsComponent},
    { 
        path: 'tusAutos', 
        component: YourOwnCarsComponent,
        canActivate: [AuthGuardService]},
    { path: 'post/:id', component: PostComponent },
    { path: 'perfil', component: ProfileComponent},
    { 
        path: 'nuevoAuto', 
        component: NewCarComponent,
        canActivate: [AuthGuardService]},
    { 
        path: 'nuevoUsuario', 
        component: NewUserComponent,
        canActivate: [AuthGuardService]},
    { 
        path: 'nuevoPost', 
        component: NewPostComponent,
        canActivate: [AuthGuardService]},
    { path: '**', pathMatch: 'full', redirectTo:'home' }
] ;

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
