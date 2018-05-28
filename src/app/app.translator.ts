import { TranslateLoader, TranslateStaticLoader, TranslateModule } from "ng2-translate";
import { Http } from '@angular/http';


export function createTranslateLoader(http: Http) {
    return new TranslateStaticLoader(http, './assets/i18n', '.json');
  }

 const OPTIONS={
    provide: TranslateLoader,
    useFactory: (createTranslateLoader),
    deps: [Http]
  }

  export const APP_TRANSLATE= TranslateModule.forRoot(OPTIONS);