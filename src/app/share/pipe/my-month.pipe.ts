import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myMonth'
})
export class MyMonthPipe implements PipeTransform {
  months = [
    {id: 1, name: 'Jan '},
    {id: 2, name: 'Feb '},
    {id: 3, name: 'Mar '},
    {id: 4, name: 'Apr '},
    {id: 5, name: 'Jan '},
    {id: 6, name: 'Feb '},
    {id: 7, name: 'Mar '},
    {id: 8, name: 'Apr '},
    {id: 9, name: 'Jan '},
    {id: 10, name: 'Feb '},
    {id: 11, name: 'Mar '},
    {id: 12, name: 'Apr '}
  ];

  transform(value: any, args?: any): any {
    let date = null;
    if (value !== undefined) {
       date = new Date(value);
    } else {
       date = new Date();
    }
    const month = date.getMonth();
    const day = date.getDay();
    return day + ' ' + this.months[month].name;
  }

}
