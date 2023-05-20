import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Language } from '../../../core/enums/language';
import { BookFilterComponent } from './book-filter.component';

describe('BookFilterComponent', () => {
  let component: BookFilterComponent;
  let fixture: ComponentFixture<BookFilterComponent>;
  const fakeBooks = [
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
  const fakeGenres = ['Жанр 1', 'Жанр 2'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookFilterComponent],
      imports: [HttpClientTestingModule, TranslateModule.forRoot()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookFilterComponent);
    component = fixture.componentInstance;
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
});
