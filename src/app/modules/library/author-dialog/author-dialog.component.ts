import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LibraryService } from '../../../core/services/library.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Author } from '../../../core/interfaces/author';
import { Mode } from '../../../core/enums/mode';

@Component({
  selector: 'app-author-dialog',
  templateUrl: './author-dialog.component.html',
  styleUrls: ['./author-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorDialogComponent implements OnInit {
  activeMode!: Mode | null;
  Mode = Mode;
  author!: Author | null;
  form = new FormGroup({
    fullName: new FormControl(''),
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Author,
    public dialogRef: MatDialogRef<AuthorDialogComponent>,
    public cdr: ChangeDetectorRef,
    private libraryService: LibraryService
  ) {}

  ngOnInit() {
    this.libraryService.activeAuthorDialogMode$.subscribe(dialogMode => {
      this.activeMode = dialogMode;
      this.cdr.markForCheck();
    });
  }

  onCreateAuthor(): void {
    this.dialogRef.close({ data: this.form.value });
  }

  onEditAuthor(): void {
    this.dialogRef.close({ data: this.form.value });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
