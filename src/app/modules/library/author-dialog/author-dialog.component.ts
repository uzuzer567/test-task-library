import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
  Inject,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
export class AuthorDialogComponent implements OnInit, OnDestroy {
  activeMode!: Mode | null;
  Mode = Mode;
  author!: Author | null;
  form = new FormGroup({
    fullName: new FormControl(''),
  });
  onDestroy$ = new Subject<void>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Author,
    public dialogRef: MatDialogRef<AuthorDialogComponent>,
    public cdr: ChangeDetectorRef,
    private libraryService: LibraryService
  ) {}

  ngOnInit() {
    this.libraryService.activeAuthorDialogMode$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(dialogMode => {
        this.activeMode = dialogMode;
        this.cdr.markForCheck();
      });
  }

  onChangeAuthorList(): void {
    this.dialogRef.close({ data: this.form.value });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
