import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibraryComponent } from './modules/library/library/library.component';
import { BookListComponent } from './modules/library/book-list/book-list.component';
import { AuthorListComponent } from './modules/library/author-list/author-list.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: 'library',
    component: LibraryComponent,
    children: [
      { path: 'book-list', component: BookListComponent },
      { path: 'author-list', component: AuthorListComponent },
    ],
  },
  { path: '', redirectTo: '/library/book-list', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
