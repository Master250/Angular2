import { ApplicationConfig, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from "./app.routes";
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from '@angular/common/http';
import { HttpInterceptorProviders } from './interceptors';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';
registerLocaleData(localeFr)

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(),
    provideHttpClient(),
    importProvidersFrom(HttpClientModule),
    HttpInterceptorProviders,

    {provide: LOCALE_ID, useValue: 'fr-FR'},
    
    
  ],
};
