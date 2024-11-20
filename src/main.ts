import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/auth/auth.interceptor';
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication( AppComponent,{
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes),
     provideAnimationsAsync(), provideAnimationsAsync(),
  ]},
)
  .catch((err) => console.error(err));
