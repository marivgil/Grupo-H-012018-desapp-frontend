import { Injectable } from '@angular/core';

@Injectable()
export class GoogleMapsService {

  constructor() { }

  googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAx82m7KSQg0obJQYw7L5tGcEXcoM1u9sE'
  });


}
