import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../../core/interfaces/book';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookCreatingDialogComponent } from '../book-creating-dialog/book-creating-dialog.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListComponent implements OnInit {
  books!: Book[];
  constructor(
    private libraryApiService: LibraryApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryApiService.getBooks().subscribe(books => {
      this.books = books;
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
}
