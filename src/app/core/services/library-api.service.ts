import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from '../interfaces/book';
import { Author } from '../interfaces/author';
import { Language } from '../enums/language';

@Injectable({
  providedIn: 'root',
})
export class LibraryApiService {
  books: Book[] = [
    {
      title: 'Название 1',
      description: 'Описание',
      author: {
        fullName: 'Полное имя 2',
      },
      numberOfPages: 99,
      language: Language.Russian,
      genre: 'Жанр 1',
    },
    {
      title: 'Название 2',
      description: 'Описание',
      author: {
        fullName: 'Полное имя 1',
      },
      numberOfPages: 100,
      language: Language.Russian,
      genre: 'Жанр 2',
    },
    {
      title: 'Название 3',
      description: 'Описание',
      author: {
        fullName: 'Полное имя',
      },
      numberOfPages: 1,
      language: Language.Russian,
      genre: 'Жанр 1',
    },
    {
      title: 'Название 4',
      description: 'Описание',
      author: {
        fullName: 'Полное имя',
      },
      numberOfPages: 100,
      language: Language.Russian,
      genre: 'Жанр 2',
    },
  ];
  authors: Author[] = [
    {
      fullName: 'Полное имя 1',
    },
    {
      fullName: 'Полное имя',
    },
  ];
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    //return this.http.get<Book[]>(`${environment.apiUrl}/books`);
    return of(this.books);
  }

  addBook(book: any) {}

  getAuthors(): Observable<Author[]> {
    //return this.http.get<Author[]>(`${environment.apiUrl}/authors`);
    return of(this.authors);
  }

  addAuthor(author: any) {}

  editAuthor(author: any) {}
}
