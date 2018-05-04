import { Injectable } from '@angular/core';
import { Jsonp, Http } from '@angular/http';
import 'rxjs/Rx'; //Map

@Injectable()
export class GoogleMapsService {

  urlBase:string= "https://maps.googleapis.com/maps/api/distancematrix/js?units=metric";
  KEY:string= "&key=AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE";
  callback:string="?callback=JSONP_CALLBACK"

  constructor( private jsonp: Jsonp) { }

  distanceMatrixRequest(origin,destination){

    let query=  `&origins=${origin.coords.lat},${origin.coords.lng}&destinations=${destination.lat},${destination.lng}`
    let url= this.urlBase + query + this.KEY;

    return this.jsonp.get(url).map(res=> console.log(res));
  }

  


}
