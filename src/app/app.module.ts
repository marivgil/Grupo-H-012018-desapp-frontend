// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { MyDateRangePickerModule } from 'mydaterangepicker';

// Routing
import { APP_ROUTING} from './app.routes';

// Services
import { PostsService } from './services/posts.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AuthGuardService } from './services/auth-guard.service';
import { GoogleMapsService } from './services/google-maps.service'

// Extern Modules
import { AgmCoreModule } from '@agm/core';
import { CarouselModule } from '../../node_modules/angular2-carousel'

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { YourOwnCarsComponent } from './components/your-own-cars/your-own-cars.component';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewCarComponent } from './components/new-car/new-car.component';
import { NewUserComponent } from './components/new-user/new-user.component';
import { NewPostComponent } from './components/new-post/new-post.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PostsComponent,
    YourOwnCarsComponent,
    PostComponent,
    ProfileComponent,
    NewCarComponent,
    NewUserComponent,
    NewPostComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE'
    }),
    CarouselModule,
    HttpModule,
    JsonpModule,
    MyDateRangePickerModule
  ],
  providers: [
    PostsService, 
    AuthService,
    AuthGuardService,
    UserService,
    GoogleMapsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
