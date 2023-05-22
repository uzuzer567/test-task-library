import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from '../../../core/interfaces/book';
import { Language } from '../../../core/enums/language';
import { LibraryService } from '../../../core/services/library.service';
import { TitleCasePipe } from '../../../core/pipes/title-case.pipe';
import { BookListItemComponent } from './book-list-item.component';

describe('BookListItemComponent', () => {
  let component: BookListItemComponent;
  let fixture: ComponentFixture<BookListItemComponent>;
  const fakeEditedAuthor$ = new BehaviorSubject<any>({});
  const fakeLibraryService = {
    editedAuthor$: fakeEditedAuthor$.asObservable(),
  };
  const fakeBook: Book = {
    id: 1,
    title: 'Название 1',
    description: 'Описание 1',
    author: {
      id: 1,
      fullName: 'Полное имя',
    },
    numberOfPages: 99,
    language: Language.English,
    genre: 'Жанр 1',
  };
  const fakeEditedAuthor = {
    previousValue: 'Полное имя',
    currentValue: 'Неполное имя',
  };

  beforeEach(async () => {
    return await TestBed.configureTestingModule({
      declarations: [BookListItemComponent, TitleCasePipe],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: MatDialog, useValue: {} },
        {
          provide: LibraryService,
          useValue: fakeLibraryService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change book author fullName', () => {
    component.book = fakeBook;
    fakeEditedAuthor$.next(fakeEditedAuthor);
    expect(component.book.author.fullName).toBe('Неполное имя');
  });
});
