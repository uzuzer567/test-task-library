import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Author } from '../../../core/interfaces/author';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookCreatingDialogComponent } from './book-creating-dialog.component';

describe('BookCreatingDialogComponent', () => {
  let component: BookCreatingDialogComponent;
  let fixture: ComponentFixture<BookCreatingDialogComponent>;
  let fakeLibraryApiService = jasmine.createSpyObj('fakeLibraryApiService', [
    'getAuthors',
  ]);
  const fakeAuthors: Author[] = [
    {
      id: 1,
      fullName: 'Полное имя',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCreatingDialogComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        {
          provide: LibraryApiService,
          useValue: fakeLibraryApiService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreatingDialogComponent);
    component = fixture.componentInstance;

    fakeLibraryApiService.getAuthors.and.returnValue(of(fakeAuthors));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAuthors and return list of authors', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.authors).toEqual(fakeAuthors);
  }));
});
