import { Component } from '@angular/core';
import {CommonModule, NgSwitch, NgSwitchCase} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLinkActive, RouterLink, RouterOutlet, NgSwitch, NgSwitchCase, DashboardComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventPlanner';
}
