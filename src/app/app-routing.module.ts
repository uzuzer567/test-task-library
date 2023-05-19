import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './modules/library/book-list/book-list.component';

const routes: Routes = [
  { path: 'book-list', component: BookListComponent },
  { path: '', redirectTo: '/book-list', pathMatch: 'full' },
  //{ path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
