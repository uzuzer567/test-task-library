import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreatingDialogComponent } from './book-creating-dialog.component';

describe('BookCreatingDialogComponent', () => {
  let component: BookCreatingDialogComponent;
  let fixture: ComponentFixture<BookCreatingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCreatingDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreatingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
