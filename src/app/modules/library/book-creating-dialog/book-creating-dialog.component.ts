import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
    numberOfPages: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    description: new FormControl(''),
    genre: new FormControl(''),
  });
  isCorrectNumber = true;
  isValidForm = true;
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

  checkNumberOfPages(): void {
    const numberOfPages = this.form.get('numberOfPages')?.value;
    if (numberOfPages.match(/^[0-9]*$/)) {
      this.isCorrectNumber = true;
    } else {
      this.isCorrectNumber = false;
    }
  }

  onCreateBook(): void {
    if (this.form.valid) {
      this.isValidForm = true;
      const formValue = this.form.value;
      formValue.author = { fullName: this.form.get('author')?.value };
      this.dialogRef.close({ data: formValue });
    } else {
      this.isValidForm = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
