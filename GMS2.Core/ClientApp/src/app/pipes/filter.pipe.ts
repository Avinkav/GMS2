import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'filter'
})

// WARNING: filter pipe
@Injectable()
export class FilterPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any {
    if (!items) {
      return [];
    }
    if (!field || !value) {
      return items;
    }

    return items.filter(i => i[field].toLowerCase().includes(value.toLowerCase()));
  }

}
