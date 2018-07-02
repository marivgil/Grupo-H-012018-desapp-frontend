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
import { VehicleService } from './services/vehicle.service';

// Extern Modules
import { CarouselModule } from '../../node_modules/angular2-carousel';
import { TranslateModule, MissingTranslationHandler } from 'ng2-translate';
import { APP_TRANSLATE } from './app.translator';
import { AgmCoreModule } from '@agm/core';
import { NeutronRatingModule } from 'neutron-star-rating';
import { NgxPaginationModule } from 'ngx-pagination';

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
import { FooterComponent } from './components/footer/footer.component';
import { MyMissingTranslationHandler } from './handlers/missingtemplate.component';
import { ActivatedRouteSnapshot } from '@angular/router';
import { CreditComponent } from './components/credit/credit.component';

// Pipes
import { ImagenPipe } from './pipes/imagen.pipe';

// Validadores
import { LinkValidatorDirective } from './directives/link-validator.directive';
import { FormatterDatePipe } from './pipes/formatter-date.pipe';
import { ReservasService } from './services/reservas.service';
import { AccountComponent } from './components/account/account.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CarGuard } from './services/car.guard';
import { PostGuard } from './services/post.guard';



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
    NewPostComponent,
    FooterComponent,
    CreditComponent,
    ImagenPipe,
    LinkValidatorDirective,
    FormatterDatePipe,
    AccountComponent,
    ReservationsComponent,
    RentalsComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    HttpModule,
    JsonpModule,
    MyDateRangePickerModule,
    APP_TRANSLATE,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE'
    }),
    NeutronRatingModule,
    NgxPaginationModule
  ],
  providers: [
    AuthGuardService,
    CarGuard,
    PostGuard,
    PostsService,
    AuthService,
    VehicleService,
    ReservasService,
    UserService,
    { provide: MissingTranslationHandler,
      useClass: MyMissingTranslationHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
