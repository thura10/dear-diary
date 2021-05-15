import { TestBed } from '@angular/core/testing';

import { PreferenceService } from './preference.service';

describe('PreferencesService', () => {
  let service: PreferenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreferenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
