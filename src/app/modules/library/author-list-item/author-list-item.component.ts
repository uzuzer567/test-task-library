import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Author } from '../../../core/interfaces/author';
import { AuthorDialogComponent } from '../author-dialog/author-dialog.component';
import { LibraryService } from '../../../core/services/library.service';
import { LibraryApiService } from '../../../core/services/library-api.service';
import { Mode } from '../../../core/enums/mode';

@Component({
  selector: 'app-author-list-item',
  templateUrl: './author-list-item.component.html',
  styleUrls: ['./author-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorListItemComponent {
  @Input() author!: Author;
  constructor(
    private libraryApiService: LibraryApiService,
    public dialog: MatDialog,
    private libraryService: LibraryService
  ) {}

  editAuthor(): void {
    this.libraryService.activeAuthorDialogMode$.next(Mode.Editing);
    const dialogRef = this.dialog.open(AuthorDialogComponent, {
      data: this.author,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.libraryApiService
          .editAuthor({ id: this.author.id, fullName: result?.data.fullName })
          .subscribe(_ =>
            this.libraryService.editedAuthor$.next({
              previousValue: this.author.fullName,
              currentValue: result?.data.fullName,
            })
          );
      }
    });
  }
}
