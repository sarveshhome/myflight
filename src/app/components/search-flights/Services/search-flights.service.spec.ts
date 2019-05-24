import { TestBed } from '@angular/core/testing';

import { SearchFlightsService } from './search-flights.service';

describe('SearchFlightsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchFlightsService = TestBed.get(SearchFlightsService);
    expect(service).toBeTruthy();
  });
});
