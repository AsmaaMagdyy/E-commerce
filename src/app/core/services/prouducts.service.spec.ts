import { TestBed } from '@angular/core/testing';

import { ProuductsService } from './prouducts.service';

describe('ProuductsService', () => {
  let service: ProuductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProuductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
