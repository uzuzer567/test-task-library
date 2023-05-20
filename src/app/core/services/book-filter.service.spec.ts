import { TestBed } from '@angular/core/testing';
import { Language } from '../enums/language';
import { BookFilterService } from './book-filter.service';

describe('BookFilterService', () => {
  let service: BookFilterService;
  const fakeBooks = [
    {
      id: 1,
      title: 'Название 1',
      description: 'Описание 1',
      author: {
        id: 1,
        fullName: 'Полное имя 1',
      },
      numberOfPages: 100,
      language: Language.English,
      genre: 'Жанр 1',
    },
  ];
  const fakeCriteria = [
    { field: 'numberOfPagesFrom', values: ['99'] },
    { field: 'numberOfPagesTo', values: ['101'] },
    { field: 'title', values: ['Название'] },
    { field: 'author', values: ['Полное имя 1'] },
  ];
  const fakeGeneratedCriteria = [
    { field: 'title', values: ['Название 2'] },
    { field: 'author', values: ['Полное имя 2'] },
    { field: 'numberOfPagesFrom', values: ['98'] },
    { field: 'language', values: ['Русский', 'English'] },
  ];
  const fakeForm = {
    title: 'Название 2',
    author: ['Полное имя 2'],
    numberOfPagesFrom: '98',
    language: [Language.Russian, Language.English],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check number of pages in book (by parameter from)', () => {
    const result = service.checkNumberOfPages(fakeCriteria[0], fakeBooks[0]);
    expect(result).toBeTruthy();
  });

  it('should check number of pages in book (by parameter to)', () => {
    const result = service.checkNumberOfPages(fakeCriteria[1], fakeBooks[0]);
    expect(result).toBeTruthy();
  });

  it('should check number of pages in book when the range is not set', () => {
    const result = service.checkNumberOfPages(fakeCriteria[2], fakeBooks[0]);
    expect(result).toBe(true);
  });

  it('should check book filter', () => {
    const result = service.filterBooks(fakeBooks, fakeCriteria);
    expect(result).toEqual([fakeBooks[0]]);
  });

  it('should check generated filter criteria', () => {
    const result = service.getFilterCriteria(fakeForm);
    expect(result).toEqual(fakeGeneratedCriteria);
  });
});
