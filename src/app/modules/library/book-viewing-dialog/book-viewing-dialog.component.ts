import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { LibraryService } from '../../../core/services/library.service';
import { Book } from '../../../core/interfaces/book';

@Component({
  selector: 'app-book-viewing-dialog',
  templateUrl: './book-viewing-dialog.component.html',
  styleUrls: ['./book-viewing-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewingDialogComponent implements OnInit, OnDestroy {
  book!: Book | null;
  onDestroy$ = new Subject<void>();
  constructor(
    public dialogRef: MatDialogRef<BookViewingDialogComponent>,
    private libraryService: LibraryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryService.selectedBook$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(selectedBook => {
        this.book = selectedBook;
        this.cdr.markForCheck();
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
