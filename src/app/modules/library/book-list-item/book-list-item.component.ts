import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../../core/interfaces/book';
import { LibraryService } from '../../../core/services/library.service';
import { BookViewingDialogComponent } from '../book-viewing-dialog/book-viewing-dialog.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListItemComponent {
  @Input() book!: Book;

  constructor(
    public dialog: MatDialog,
    private libraryService: LibraryService
  ) {}

  onSelectBook(): void {
    this.libraryService.selectedBook$.next(this.book);
    this.dialog.open(BookViewingDialogComponent);
  }
}
