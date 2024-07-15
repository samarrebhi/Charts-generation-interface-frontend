import { TestBed } from '@angular/core/testing';

import { PersonnechartsService } from './personnecharts.service';

describe('PersonnechartsService', () => {
  let service: PersonnechartsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonnechartsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
