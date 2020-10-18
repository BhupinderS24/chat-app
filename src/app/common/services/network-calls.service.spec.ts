import { TestBed } from '@angular/core/testing';

import { NetworkCallsService } from './network-calls.service';

describe('NetworkCallsService', () => {
  let service: NetworkCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
