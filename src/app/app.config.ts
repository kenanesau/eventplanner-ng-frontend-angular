import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import {EVENTS_ROUTES} from "./event-routes";
import {API_URL} from "../tokens";
import {environment} from "../environments/environment";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(EVENTS_ROUTES), provideAnimations(), provideHttpClient(),
    {provide: API_URL, useValue: environment.apiUrl}
  ]
};
