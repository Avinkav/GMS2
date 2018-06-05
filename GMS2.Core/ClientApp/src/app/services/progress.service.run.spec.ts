import { TestBed, inject } from '@angular/core/testing';
import { ProgressService } from './progress.service';

describe('ProgressService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [ProgressService] });
  });

  it('should be created', inject([ProgressService], (service: ProgressService) => {
    expect(service).toBeTruthy();
  }));

  it('should emit false on creation', inject([ProgressService], (service: ProgressService) => {
    service.inProgress.asObservable().subscribe(
      status => expect(status).toBe(false)
    );

  }));

  it('should emit true on start()', inject([ProgressService], (service: ProgressService) => {
    service.start();

    service.inProgress.asObservable().subscribe(
      status => expect(status).toBe(true)
    );

  }));

  it('should emit false on stop()', inject([ProgressService], (service: ProgressService) => {
    service.stop();

    service.inProgress.asObservable().subscribe(
      status => expect(status).toBe(false)
    );

  }));
});
