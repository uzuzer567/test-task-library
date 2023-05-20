import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Book } from '../interfaces/book';
import { Author } from '../interfaces/author';

@Injectable({
  providedIn: 'root',
})
export class LibraryApiService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${environment.apiUrl}/books`);
  }

  addBook(book: Book) {
    return this.http.post<Book>(`${environment.apiUrl}/books`, book);
  }

  editBook(book: Book) {
    return this.http.put<Author>(
      `${environment.apiUrl}/books/` + book.id,
      book
    );
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/authors`);
  }

  addAuthor(author: Author) {
    return this.http.post<Author>(`${environment.apiUrl}/authors`, author);
  }

  editAuthor(author: Author) {
    return this.http.put<Author>(
      `${environment.apiUrl}/authors/` + author.id,
      author
    );
  }
}
