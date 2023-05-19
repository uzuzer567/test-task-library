import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookViewingDialogComponent } from './book-viewing-dialog.component';

describe('BookViewingDialogComponent', () => {
  let component: BookViewingDialogComponent;
  let fixture: ComponentFixture<BookViewingDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookViewingDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookViewingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
