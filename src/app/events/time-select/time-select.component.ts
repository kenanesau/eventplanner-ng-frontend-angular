import {Component, EventEmitter, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {createEventTimeValidator} from "../shared/validators";

@Component({
  selector: 'ep-time-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.scss']
})
export class TimeSelectComponent {
  @Output() selectedTime = new EventEmitter<Date>();

  timeForm = new FormGroup(
    {
      hours: new FormControl('12:00', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(24)
        ]
      }),
      minutes: new FormControl('00', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.min(0),
          Validators.max(50),
          createEventTimeValidator(10)
        ]
      })
    }
  );

  submitForm() {
    const eventTime: Date = new Date(
      2023, 6,
      Number(this.timeForm.getRawValue().hours),
      Number(this.timeForm.getRawValue().minutes)
      )
    this.selectedTime.emit(eventTime);
  }

}
