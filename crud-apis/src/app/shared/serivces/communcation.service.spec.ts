import { TestBed } from '@angular/core/testing';

import { CommuncationService } from './communcation.service';

describe('CommuncationService', () => {
  let service: CommuncationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommuncationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
