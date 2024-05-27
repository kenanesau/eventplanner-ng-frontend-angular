import { TestBed } from '@angular/core/testing';

import { EventCollisionValidatorServiceService } from './event-collision-validator-service.service';

describe('EventCollisionValidatorServiceService', () => {
  let service: EventCollisionValidatorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventCollisionValidatorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
