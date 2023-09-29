import { Injectable } from '@angular/core';
import { Maybe } from 'src/app/core/api/generated/schema';
import { Period } from 'src/app/core/typings/period';
import { RecurrenceOptions } from '../typings/scheduler';

@Injectable()
export class SchedulerService {
  public calculateSchedules(
    initialAppointment: Maybe<Period>,
    options: RecurrenceOptions
  ): Period[] {
  
    const result: Period[] = [];
    if (initialAppointment) {
      let currentStartDate = initialAppointment.startDate;
      let currentEndDate = initialAppointment.endDate;
      let count = 0;
    
      while (
        (options.untilDate && currentStartDate < options.untilDate) ||
        (options.repeatTimes && count <= options.repeatTimes)
      ) {
        const nextStartDate = new Date(currentStartDate);
        const nextEndDate = new Date(currentEndDate);
        switch (options.recurrence) {
          case 'daily':
            nextStartDate.setDate(currentStartDate.getDate() + options.interval);
            nextEndDate.setDate(currentEndDate.getDate() + options.interval);
            break;
          case 'weekly':
            nextStartDate.setDate(currentStartDate.getDate() + options.interval * 7);
            nextEndDate.setDate(currentEndDate.getDate() + options.interval * 7);
            break;
          case 'monthly':
            nextStartDate.setMonth(currentStartDate.getMonth() + options.interval);
            nextEndDate.setMonth(nextEndDate.getMonth() + options.interval);
            break;
          case 'yearly':
            nextStartDate.setFullYear(currentStartDate.getFullYear() + options.interval);
            nextEndDate.setFullYear(nextEndDate.getFullYear() + options.interval);
            break;
          default:
            throw new Error('Invalid periodicType');
        }
    
        currentStartDate = nextStartDate;
        currentEndDate = nextEndDate;
        count++;
  
        if ((options.untilDate && currentStartDate < options.untilDate) ||
        (options.repeatTimes && count <= options.repeatTimes)) {
          result.push({ startDate: nextStartDate, endDate: nextEndDate });
        }
      }
    }
  
    return result;
  }
}
