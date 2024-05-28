import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventCreateComponent} from "./event-create/event-create.component";
import {EventEditComponent} from "./event-edit/event-edit.component";

export const EVENTS_ROUTES: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'create', component: EventCreateComponent},
  { path: 'edit/:id', component: EventEditComponent},
];
