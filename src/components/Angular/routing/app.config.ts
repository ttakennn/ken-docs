import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { DialogModule } from '@angular/cdk/dialog';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { spinnerInterceptor } from '@/app/shared/interceptor/spinner.interceptor';
import { authInterceptor } from '@/app/shared/interceptor/auth.interceptor';
import { AppInterceptor } from '@/app/shared/interceptor/app.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    // http client
    provideHttpClient(
      withInterceptorsFromDi(), // register call based interceptor
      withInterceptors([authInterceptor, spinnerInterceptor]), // register interceptor
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }, // register call based interceptor
    provideRouter(routes),
    importProvidersFrom(DialogModule),
  ],
};
