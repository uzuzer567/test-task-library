import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LibraryService } from '../../../core/services/library.service';
import { Book } from '../../../core/interfaces/book';

@Component({
  selector: 'app-book-viewing-dialog',
  templateUrl: './book-viewing-dialog.component.html',
  styleUrls: ['./book-viewing-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookViewingDialogComponent implements OnInit {
  book!: Book | null;

  constructor(
    public dialogRef: MatDialogRef<BookViewingDialogComponent>,
    private libraryService: LibraryService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryService.selectedBook$.subscribe(selectedBook => {
      this.book = selectedBook;
      this.cdr.markForCheck();
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
