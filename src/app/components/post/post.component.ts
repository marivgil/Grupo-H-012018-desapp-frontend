import { Component, OnInit,  ViewChild } from '@angular/core';
import { Post } from '../../interfaces/post.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../../services/posts.service';
import {CarouselComponent} from "angular2-carousel";
import { TranslateService } from 'ng2-translate';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ReservasService } from '../../services/reservas.service';

declare var google: any;
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})



export class PostComponent implements OnInit {


  post;
  zoom: number = 15;
  // Start position
  lat: number = -34.603418;
  lng: number = -58.381592;
  // Markers
  markers: Marker[] = [];
  draggable = false;

  duration: string;
  distance: string;
  date = 20180629;

  @ViewChild('topCarousel') topCarousel: CarouselComponent;

  constructor(private activatedRoute: ActivatedRoute,
              private _postsService: PostsService,
              private _reservationService: ReservasService,
              private _authService: AuthService,
              private _userService: UserService,
              private _translate: TranslateService,
              private _router: Router) {

      this.activatedRoute.params.subscribe( params => {
        // Se pone id porque es el nombre del parametro que esta en el routing ((/post/:id))!!!!!
        this._postsService.getPost(params['id']).subscribe(res => {
          this.post = res.json();
          this.lat = this.post.pickUpCoord.lat;
          this.lng = this.post.pickUpCoord.lng;
          let marker: Marker = {name: "Lugar de Retiro", lat: this.lat, lng: this.lng, draggable: false};
          this.markers.push(marker);
        });
      });
  }



  ngOnInit() {
  }


  reservar(id: number) {
//    this._router.navigate(['/home']);

    if (this._authService.isAuthenticated()) {
      this._reservationService.bookPost(id, this._userService.userProfile.email, this.post.sinceDate, this.post.untilDate)
                          .subscribe((res: any) => {
                            console.log(res);
                            this._router.navigate(['/misReservas']);
                          });
    } else {
      this._authService.login();
    }

}



  toggle() {
    this.topCarousel.toggleMode();
  }

  cb = (response, status) => {
    if (status === 'OK') {
      this.distance = response.rows[0].elements[0].distance.text;
      this.duration = response.rows[0].elements[0].duration.text;
    }
    console.log(this.distance);
    console.log(this.duration);
  }

  mapClicked($event: any) {
    let marker: Marker = {name: "Mi partida", lat: $event.coords.lat, lng: $event.coords.lng, draggable: false};
    this.markers.push(marker);

    let service = new google.maps.DistanceMatrixService();
    let origin1 = new google.maps.LatLng(marker.lat, marker.lng);
    let destinationA = new google.maps.LatLng(this.post.pickUpCoord.lat, this.post.pickUpCoord.lng);

    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: google.maps.TravelMode.WALKING
      }, this.cb);
  }


  markerClicked(m) {
    let service = new google.maps.DistanceMatrixService();
    let origin1 = new google.maps.LatLng(m.lat, m.lng);
    let destinationA = new google.maps.LatLng(this.post.pickUpCoord.lat, this.post.pickUpCoord.lng);

    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: google.maps.TravelMode.WALKING
      }, this.cb);

  }
}

interface Marker {
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}
