import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Language } from '../../../core/enums/language';
import { Book } from '../../../core/interfaces/book';
import { Author } from '../../../core/interfaces/author';
import { BookFilterService } from '../../../core/services/book-filter.service';
import { LibraryService } from '../../../core/services/library.service';
import { LibraryApiService } from '../../../core/services/library-api.service';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookFilterComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    language: new FormControl(''),
    numberOfPagesFrom: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    numberOfPagesTo: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    genre: new FormControl(''),
  });
  isCorrectFromNumber = true;
  isCorrectToNumber = true;
  @Output() filterChanged = new EventEmitter<boolean>();
  authors!: Author[];
  @Input() books!: Book[];
  constructor(
    private bookFilterService: BookFilterService,
    private libraryService: LibraryService,
    private libraryApiService: LibraryApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryApiService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.cdr.markForCheck();
    });
  }

  getLanguages(): Language[] {
    return Object.values(Language);
  }

  getGenres(): string[] {
    const genres = this.books?.map(
      book => book.genre[0].toUpperCase() + book.genre.slice(1)
    );
    return Array.from(new Set(genres));
  }

  checkNumberOfPagesFrom(): void {
    const numberOfPagesFrom = this.form.get('numberOfPagesFrom')?.value;
    if (numberOfPagesFrom.match(/^[0-9]*$/)) {
      this.isCorrectFromNumber = true;
    } else {
      this.isCorrectFromNumber = false;
    }
  }

  checkNumberOfPagesTo(): void {
    const numberOfPagesTo = this.form.get('numberOfPagesTo')?.value;
    if (numberOfPagesTo.match(/^[0-9]*$/)) {
      this.isCorrectToNumber = true;
    } else {
      this.isCorrectToNumber = false;
    }
  }

  onFilterBooks(): void {
    this.checkNumberOfPagesTo();
    this.checkNumberOfPagesFrom();
    if (!this.isCorrectToNumber || !this.isCorrectFromNumber) {
      this.filterChanged.emit(false);
    }
    this.libraryService.activeBookFilter$.next(
      this.bookFilterService.getFilterCriteria(this.form.value)
    );
  }
}
