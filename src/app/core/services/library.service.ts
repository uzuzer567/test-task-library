import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../interfaces/book';
import { Mode } from '../enums/mode';
import { FilterCriterion } from '../interfaces/filter-criterion';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  selectedBook$ = new BehaviorSubject<Book | null>(null);
  activeBookFilter$ = new BehaviorSubject<FilterCriterion[]>([]);

  editedAuthor$ = new BehaviorSubject<any>({});
  activeAuthorDialogMode$ = new BehaviorSubject<Mode | null>(null);
}
