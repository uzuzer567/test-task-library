import { Author } from './author';
import { Language } from '../enums/language';

export interface Book {
  title: string;
  description: string;
  author: Author;
  numberOfPages: number;
  language: Language;
  genre: string;
}
