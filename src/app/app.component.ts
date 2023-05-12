import { Component } from '@angular/core';
import {CommonModule, NgSwitch, NgSwitchCase} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatSlideToggleModule, NgSwitch, NgSwitchCase],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EventPlanner';
}
