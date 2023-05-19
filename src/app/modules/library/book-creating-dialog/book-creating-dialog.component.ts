import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from '../../../core/interfaces/author';
import { Language } from '../../../core/enums/language';
import { LibraryApiService } from '../../../core/services/library-api.service';

@Component({
  selector: 'app-book-creating-dialog',
  templateUrl: './book-creating-dialog.component.html',
  styleUrls: ['./book-creating-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookCreatingDialogComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl(''),
    author: new FormControl(''),
    language: new FormControl(''),
    numberOfPages: new FormControl(''),
    description: new FormControl(''),
  });
  authors!: Author[];
  constructor(
    public dialogRef: MatDialogRef<BookCreatingDialogComponent>,
    private libraryApiService: LibraryApiService
  ) {}

  ngOnInit() {
    this.libraryApiService
      .getAuthors()
      .subscribe(authors => (this.authors = authors));
  }

  getLanguages() {
    return Object.values(Language);
  }

  onCreateBook(): void {
    this.dialogRef.close({ data: this.form.value });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
