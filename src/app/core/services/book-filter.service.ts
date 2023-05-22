import { Injectable } from '@angular/core';
import { Book } from '../interfaces/book';
import { FilterCriterion } from '../interfaces/filter-criterion';

@Injectable({
  providedIn: 'root',
})
export class BookFilterService {
  getFilterCriteria(formValue: any): any[] {
    return Object.entries(formValue)
      .filter((pair: any) => pair[1] && pair[1]?.length)
      .map(pair => {
        if (typeof pair[1] === 'object') {
          return {
            field: pair[0],
            values: pair[1],
          };
        } else {
          return {
            field: pair[0],
            values: [pair[1]],
          };
        }
      });
  }

  checkNumberOfPages(criterion: FilterCriterion, book: Book): boolean {
    if (criterion.field.includes('From')) {
      return book.numberOfPages >= +criterion.values;
    } else if (criterion.field.includes('To')) {
      return book.numberOfPages <= +criterion.values;
    } else {
      return true;
    }
  }

  filterBooks(books: Book[], criteria: FilterCriterion[]): Book[] {
    let filteredBooks: Book[] = [];
    if (!criteria.length) {
      filteredBooks = books;
    } else {
      filteredBooks = books.filter((book: Book) => {
        return criteria.every((criterion: FilterCriterion) => {
          if (criterion.field.includes('numberOfPages')) {
            return this.checkNumberOfPages(criterion, book);
          } else {
            let bookProperty = book[criterion.field as keyof Book];
            if (typeof bookProperty !== 'object') {
              return bookProperty
                .toString()
                .toLowerCase()
                .includes(criterion.values.toString().toLowerCase());
            } else {
              return criterion.values.some(value =>
                Object.values(bookProperty).includes(value)
              );
            }
          }
        });
      });
    }
    return filteredBooks;
  }
}
