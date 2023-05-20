import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../../../core/interfaces/author';
import { Mode } from '../../../core//enums/mode';
import { LibraryService } from '../../../core/services/library.service';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListComponent implements OnInit {
  authors!: Author[];
  constructor(
    private libraryService: LibraryService,
    private libraryApiService: LibraryApiService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.libraryApiService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.cdr.markForCheck();
    });
  }

  onCreateAuthor(): void {
    this.libraryService.activeAuthorDialogMode$.next(Mode.Creating);
    const dialogRef = this.dialog.open(AuthorDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryApiService.addAuthor(result?.data);
      }
    });
  }
}
