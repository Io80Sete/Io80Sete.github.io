import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  /**
   * Create a list of dates from -(days - 1) days to today and format them
   * @param days: number
   */
  getDatesArrayOfPastXDays(days: number): string[] {
    let datesArray: string[] = [];
    for (let i = 0; i < days; i++) {
      let date: string = moment().subtract(i, 'days').format('YYYY-MM-DD');
      datesArray.push(date);
    }
    return datesArray;
  }
}
