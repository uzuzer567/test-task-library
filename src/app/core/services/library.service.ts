import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  selectedBook$ = new BehaviorSubject<Book | null>(null);
}
