import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Pipe({
  name: 'formatterDate'
})
export class FormatterDatePipe implements PipeTransform {

  transform(value: string, translate: TranslateService, args?: any): any {
    console.log("Pase por formatter" + translate.currentLang);

    switch (translate.currentLang) {
      case "en": return this.formatterEn(value);

      case "es": return this.formatterEs(value);

      default: return value;
    }
  }

  private formatterEs(value) {
    let dates = value.split("-");
    return dates[2] + "-" + dates[1] + "-" + dates [0];
  }

  private formatterEn(value) {
    let dates = value.split("-");
    return dates[2] + "-" + dates[1] + "-" + dates [0];

  }
}
