import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookLessonComponent } from './book-lesson.component';

describe('BookLessonComponent', () => {
  let component: BookLessonComponent;
  let fixture: ComponentFixture<BookLessonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookLessonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
