import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from "@angular/common/http";
import {EVENTS_ROUTES} from "./event-routes";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(EVENTS_ROUTES), provideAnimations(), provideHttpClient()]
};
