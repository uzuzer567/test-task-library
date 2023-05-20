import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Language } from '../../../core/enums/language';
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
    numberOfPagesFrom: new FormControl(''),
    numberOfPagesTo: new FormControl(''),
  });
  authors!: Author[];
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

  getLanguages() {
    return Object.values(Language);
  }

  onFilterBooks(): void {
    this.libraryService.activeBookFilter$.next(
      this.bookFilterService.getFilterCriteria(this.form.value)
    );
  }
}
