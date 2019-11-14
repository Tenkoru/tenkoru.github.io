/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardFilterService } from './dashboardFilter.service';

describe('Service: DashboardFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardFilterService]
    });
  });

  it('should ...', inject([DashboardFilterService], (service: DashboardFilterService) => {
    expect(service).toBeTruthy();
  }));
});
