import { Component } from '@angular/core';
import {CommonModule, NgSwitch, NgSwitchCase} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet, NgSwitch, NgSwitchCase, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventPlanner';
}
