// src/app/app.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './services/auth.service';
// tslint:disable-next-line:import-blacklist
import { Subscription } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { ActivatedRoute } from '@angular/router';

declare var navigator;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(public auth: AuthService,
              private translate: TranslateService,
              private activatedRoute: ActivatedRoute) {

                auth.handleAuthentication();
                translate.addLangs(["en", "es"]);
                translate.setDefaultLang('es');

                let browserLang = translate.getBrowserLang();
                translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
                navigator.geolocation.getCurrentPosition(this.success, this.error, this.options);

    }

    options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    private success(pos) {
      let crd = pos.coords;

      console.log('Your current position is:');
      console.log('Latitude : ' + crd.latitude);
      console.log('Longitude: ' + crd.longitude);
      console.log('More or less ' + crd.accuracy + ' meters.');
    }

    private error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }

    ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        let locale = param['locale'];
        if (locale !== undefined) {
            this.translate.use(locale);
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }


}
