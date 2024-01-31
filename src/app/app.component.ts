import {ChangeDetectorRef, Component, Input, OnDestroy} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'ep-root',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'EventPlanner';
}
