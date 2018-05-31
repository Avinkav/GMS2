import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

// WARNING: filter pipe
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any {
    if (!items)
      return [];

    if (!value)
      return items;

    if (field) {
      const fields = field.split(',');
      return items.filter(i => {
        return fields.reduce((acc, val) => {
          if (!i[val]) {
            return (false || acc);
          }

          // Check if field is an arrray
          // tslint:disable-next-line:curly
          if (Array.isArray(i[val])) {
            return i[val].reduce((acc2, val2) => {
              return (this.includesIgnoreCase(val2, value) || acc2);
            }, acc);
          }
          return (this.includesIgnoreCase(i[val], value) || acc);
        }, false);
      });
    }
    return items.filter(i => this.includesIgnoreCase(i, value));
  }

  includesIgnoreCase(val: string, include: string) {
    return val.toLowerCase().includes(include.toLowerCase());
  }

}
