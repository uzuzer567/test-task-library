import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleCase',
})
export class TitleCasePipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (value) {
      return value[0].toUpperCase() + value.slice(1);
    } else {
      return value;
    }
  }
}
