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
      title: 'Название',
      description: 'Описание',
      author: {
        fullName: 'Полное имя',
      },
      numberOfPages: 100,
      language: Language.Russian,
      genre: 'Жанр',
    },
    {
      title: 'Название',
      description: 'Описание',
      author: {
        fullName: 'Полное имя',
      },
      numberOfPages: 100,
      language: Language.Russian,
      genre: 'Жанр',
    },
    {
      title: 'Название',
      description: 'Описание',
      author: {
        fullName: 'Полное имя',
      },
      numberOfPages: 100,
      language: Language.Russian,
      genre: 'Жанр',
    },
    {
      title: 'Название',
      description: 'Описание',
      author: {
        fullName: 'Полное имя',
      },
      numberOfPages: 100,
      language: Language.Russian,
      genre: 'Жанр',
    },
  ];
  authors: Author[] = [
    {
      fullName: 'Автор',
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
}
