import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Language } from '../../../core/enums/language';
import { Book } from '../../../core/interfaces/book';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookListComponent } from './book-list.component';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let fakeLibraryApiService = jasmine.createSpyObj('fakeLibraryApiService', [
    'getBooks',
  ]);
  let fakeBooks: Book[] = [
    {
      id: 1,
      title: 'Название 1',
      description: 'Описание 1',
      author: {
        id: 1,
        fullName: 'Полное имя 1',
      },
      numberOfPages: 99,
      language: Language.English,
      genre: 'Жанр 1',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialog, useValue: {} },
        {
          provide: LibraryApiService,
          useValue: fakeLibraryApiService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;

    fakeLibraryApiService.getBooks.and.returnValue(of(fakeBooks));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getBooks and return list of books', fakeAsync(() => {
    component.reload$.next();
    tick();
    expect(component.books).toEqual(fakeBooks);
  }));
});
