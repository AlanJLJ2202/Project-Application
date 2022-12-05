import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {


  transform(items: any[], field: string, value: string): any[] {

    if (!items) return [];
    if (!value) return items;
    if (!field) return items;
    return items.filter(it => it[field].toLowerCase().includes(value.toLowerCase()));

  }

}
