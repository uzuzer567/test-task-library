import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../../core/interfaces/book';
import { LibraryService } from '../../../core/services/library.service';
import { BookFilterService } from '../../../core/services/book-filter.service';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookCreatingDialogComponent } from '../book-creating-dialog/book-creating-dialog.component';
import { FilterCriterion } from 'src/app/core/interfaces/filter-criterion';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
  books!: Book[];
  filteredBooks!: Book[];
  constructor(
    private bookFilterService: BookFilterService,
    private libraryService: LibraryService,
    private libraryApiService: LibraryApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryApiService.getBooks().subscribe(books => {
      this.books = books;
      this.filteredBooks = books;
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
        this.libraryApiService.addBook(result?.data);
      }
    });
  }

  filterBooks(criteria: FilterCriterion[]) {
    this.filteredBooks = this.bookFilterService.filterBooks(
      this.books,
      criteria
    );
  }
}
