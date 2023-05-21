import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Language } from '../../../core/enums/language';
import { Author } from '../../../core/interfaces/author';
import { Book } from '../../../core/interfaces/book';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookFilterComponent } from './book-filter.component';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;
  let fakeLibraryApiService = jasmine.createSpyObj('fakeLibraryApiService', [
    'getAuthors',
  ]);
  const fakeBooks: Book[] = [
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
    {
      id: 2,
      title: 'Название 2',
      description: 'Описание 2',
      author: {
        id: 1,
        fullName: 'Полное имя 2',
      },
      numberOfPages: 101,
      language: Language.Russian,
      genre: 'Жанр 2',
    },
  ];
  const fakeGenres: string[] = ['Жанр 1', 'Жанр 2'];
  const fakeAuthors: Author[] = [
    {
      id: 1,
      fullName: 'Полное имя',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFilterComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        {
          provide: LibraryApiService,
          useValue: fakeLibraryApiService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;

    fakeLibraryApiService.getAuthors.and.returnValue(of(fakeAuthors));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate list of genres', () => {
    component.books = fakeBooks;
    const result = component.getGenres();
    expect(result).toEqual(fakeGenres);
  });

  it('should call getAuthors and return list of authors', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.authors).toEqual(fakeAuthors);
  }));
});
