import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { PersonnechartsService } from './personnecharts.service';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient()]
};






