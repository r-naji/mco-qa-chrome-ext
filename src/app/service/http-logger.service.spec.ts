import { TestBed, inject } from '@angular/core/testing';

import { HttpLoggerService } from './http-logger.service';

describe('HttpLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpLoggerService]
    });
  });

  it('should be created', inject([HttpLoggerService], (service: HttpLoggerService) => {
    expect(service).toBeTruthy();
  }));
});
