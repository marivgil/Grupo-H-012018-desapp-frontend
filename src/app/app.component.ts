// src/app/app.component.ts

import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Subscription } from 'rxjs';
import { TranslateService } from 'ng2-translate';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private subscription: Subscription;

  constructor(public auth:AuthService, private translate: TranslateService, private activatedRoute: ActivatedRoute) {
    auth.handleAuthentication();
        translate.addLangs(["en", "es"]);
        translate.setDefaultLang('es');

        let browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
      
    }

    ngOnInit() {
    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        let locale = param['locale'];
        if (locale !== undefined){
            this.translate.use(locale);
        }
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }


}
