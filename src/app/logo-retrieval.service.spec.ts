import { TestBed } from '@angular/core/testing';

import { LogoRetrievalService } from './logo-retrieval.service';

describe('LogoRetrievalService', () => {
  let service: LogoRetrievalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogoRetrievalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
