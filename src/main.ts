import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {Route} from "@angular/router";

export const ROUTES: Route[] = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  {
    path: 'events',
    loadChildren: () => import('./app/event-routes').then( m => m.EVENTS_ROUTES )
  }
];
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
