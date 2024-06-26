import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventFormComponent } from './event-form.component';

describe('EventComponent', () => {
  let component: EventFormComponent;
  let fixture: ComponentFixture<EventFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EventFormComponent]
    });
    fixture = TestBed.createComponent(EventFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
