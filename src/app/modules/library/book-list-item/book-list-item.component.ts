import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../../core/interfaces/book';
import { LibraryService } from '../../../core/services/library.service';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { BookViewingDialogComponent } from '../book-viewing-dialog/book-viewing-dialog.component';

@Component({
  selector: 'app-book-list-item',
  templateUrl: './book-list-item.component.html',
  styleUrls: ['./book-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookListItemComponent implements OnInit, OnDestroy {
  @Input() book!: Book;
  onDestroy$ = new Subject<void>();
  constructor(
    public dialog: MatDialog,
    private libraryApiService: LibraryApiService,
    private libraryService: LibraryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryService.editedAuthor$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(author => {
        if (author?.previousValue === this.book.author.fullName) {
          this.book.author.fullName = author.currentValue;
          this.libraryApiService
            .editBook(this.book)
            .subscribe(_ => this.cdr.markForCheck());
        }
      });
  }

  onSelectBook(): void {
    this.libraryService.selectedBook$.next(this.book);
    this.dialog.open(BookViewingDialogComponent);
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
