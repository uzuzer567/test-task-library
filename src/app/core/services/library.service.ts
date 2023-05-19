import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Book } from '../interfaces/book';
import { Mode } from '../enums/mode';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  selectedBook$ = new BehaviorSubject<Book | null>(null);
  activeDialogMode$ = new BehaviorSubject<Mode | null>(null);
}
