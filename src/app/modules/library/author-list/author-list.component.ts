import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subject, takeUntil, switchMap, startWith, combineLatest } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../../../core/interfaces/author';
import { AuthorDialogMode } from '../../../core/enums/author-dialog-mode';
import { LibraryService } from '../../../core/services/library.service';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent implements OnInit, OnDestroy {
  isLoading = false;
  authors!: Author[];
  onDestroy$ = new Subject<void>();
  constructor(
    private libraryService: LibraryService,
    private libraryApiService: LibraryApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryService.editedAuthor$
      .pipe(startWith(null))
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(_ => {
          this.isLoading = true;
          this.cdr.markForCheck();
          return this.libraryApiService.getAuthors();
        })
      )
      .subscribe(authors => {
        this.authors = authors;
        this.isLoading = false;
        this.cdr.markForCheck();
      });
  }

  onCreateAuthor(): void {
    this.libraryService.activeAuthorDialogMode$.next(AuthorDialogMode.Creating);
    const dialogRef = this.dialog.open(AuthorDialogComponent, { width: '60%' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryApiService
          .addAuthor(result?.data)
          .subscribe(_ => this.libraryService.editedAuthor$.next({}));
      }
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
