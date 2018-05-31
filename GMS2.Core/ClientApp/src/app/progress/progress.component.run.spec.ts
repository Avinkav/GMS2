import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { ProgressComponent } from './progress.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressService } from '../services/progress.service';

describe('ProgressComponent', () => {
  let component: ProgressComponent;
  let fixture: ComponentFixture<ProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgbModule.forRoot()],
      providers: [ProgressService],
      declarations: [ProgressComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initially render no progress bar', () => {
    const rootDivElement: HTMLElement = fixture.nativeElement;
    expect(rootDivElement.firstElementChild).toBeNull('rendered a chile element when it shouldnt');
  });

  it('should set progress to true when progressService.start() is called',
    inject([ProgressService], fakeAsync((progressService: ProgressService) => {
      const rootDivElement: HTMLElement = fixture.nativeElement;

      progressService.start();
      expect(component.progress).toBe(true);
    })));

    it('should set progress to false when progressService.stop() is called',
    inject([ProgressService], fakeAsync((progressService: ProgressService) => {
      const rootDivElement: HTMLElement = fixture.nativeElement;

      progressService.stop();
      expect(component.progress).toBe(false);
    })));

});
