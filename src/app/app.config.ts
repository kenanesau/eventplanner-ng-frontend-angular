import { ApplicationConfig } from '@angular/core';
import {provideRouter, Route} from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import {API_URL} from "../tokens";
import {environment} from "../environments/environment";

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'events',
    loadChildren: () => import('./events/events-routes').then( m => m.EVENTS_ROUTES )
  }
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(ROUTES), provideAnimations(), provideHttpClient(),
    {provide: API_URL, useValue: environment.apiUrl}
  ]
};
