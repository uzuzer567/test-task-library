import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, takeUntil, switchMap, startWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../../core/interfaces/book';
import { LibraryService } from '../../../core/services/library.service';
import { BookFilterService } from '../../../core/services/book-filter.service';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookCreatingDialogComponent } from '../book-creating-dialog/book-creating-dialog.component';
import { FilterCriterion } from '../../../core/interfaces/filter-criterion';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit, OnDestroy {
  isLoading = false;
  books!: Book[];
  filteredBooks!: Book[];
  reload$ = new Subject<void>();
  onDestroy$ = new Subject<void>();
  constructor(
    private bookFilterService: BookFilterService,
    private libraryService: LibraryService,
    private libraryApiService: LibraryApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.reload$
      .pipe(startWith(null))
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(_ => {
          this.isLoading = true;
          this.cdr.markForCheck();
          return this.libraryApiService.getBooks();
        })
      )
      .subscribe(books => {
        this.books = books;
        this.filteredBooks = books;
        this.isLoading = false;
        this.cdr.markForCheck();
      });

    this.libraryService.activeBookFilter$.subscribe(activeFilter => {
      this.filterBooks(activeFilter);
      this.cdr.markForCheck();
    });
  }

  onCreateBook(): void {
    const dialogRef = this.dialog.open(BookCreatingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryApiService
          .addBook(result?.data)
          .subscribe(_ => this.reload$.next());
      }
    });
  }

  filterBooks(criteria: FilterCriterion[]) {
    this.filteredBooks = this.bookFilterService.filterBooks(
      this.books,
      criteria
    );
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
