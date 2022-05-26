import { TestBed } from '@angular/core/testing';

import { ServiceEntitieService } from './service-entitie.service';

describe('ServiceEntitieService', () => {
  let service: ServiceEntitieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceEntitieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
