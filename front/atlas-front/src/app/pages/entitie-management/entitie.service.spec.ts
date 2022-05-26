import { TestBed } from '@angular/core/testing';

import { EntitieService } from './entitie.service';

describe('EntitieService', () => {
  let service: EntitieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntitieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
