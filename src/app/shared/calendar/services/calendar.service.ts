import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Period } from '../../../core/typings/period';
import { monthPeriod } from '../../../core/utils/date.utils';

@Injectable()
export class CalendarService {

  private month = new Subject<Period>();

  public selectedMonth(): Observable<Period> {
    return this.month.asObservable();
  }

  public select(date: Date) {
    this.month.next(monthPeriod(date) as Period);
  }

}
