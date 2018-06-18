import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  constructor(private translate: TranslateService) { }

  changeLanguage(lang) {
    this.translate.use(lang);
}
}
