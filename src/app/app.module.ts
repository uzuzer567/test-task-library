import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslationModule } from './modules/translation/translation.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListItemComponent } from './modules/library/book-list-item/book-list-item.component';
import { BookListComponent } from './modules/library/book-list/book-list.component';
import { BookViewingDialogComponent } from './modules/library/book-viewing-dialog/book-viewing-dialog.component';
import { LibraryComponent } from './modules/library/library/library.component';
import { BookCreatingDialogComponent } from './modules/library/book-creating-dialog/book-creating-dialog.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthorListComponent } from './modules/library/author-list/author-list.component';
import { AuthorListItemComponent } from './modules/library/author-list-item/author-list-item.component';
import { NavigationComponent } from './shared/components/navigation/navigation.component';
import { AuthorDialogComponent } from './modules/library/author-dialog/author-dialog.component';
import { BookFilterComponent } from './modules/library/book-filter/book-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListItemComponent,
    BookListComponent,
    BookViewingDialogComponent,
    LibraryComponent,
    BookCreatingDialogComponent,
    NotFoundComponent,
    AuthorListComponent,
    AuthorListItemComponent,
    NavigationComponent,
    AuthorDialogComponent,
    BookFilterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TranslationModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
