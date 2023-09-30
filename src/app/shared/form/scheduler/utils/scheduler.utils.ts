import { Period } from 'src/app/core/typings/period';
import { SchedulerState } from '../state/scheduler.reducer';
import { RecurrenceOptions, SchedulerErrors } from '../typings/scheduler';

export const calculateSchedules = (
  options: RecurrenceOptions
): Period[] => {

  const result: Period[] = [];
  if (options.initialSchedule) {
    let currentStartDate = options.initialSchedule.startDate;
    let currentEndDate = options.initialSchedule.endDate;
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

export const removeError = (state: SchedulerState, removable: SchedulerErrors): SchedulerErrors[] => 
  [...new Set([...state.errors].filter(error => error !== removable))];

export const addError = (state: SchedulerState, addable: SchedulerErrors): SchedulerErrors[] =>
  [...new Set([...state.errors, addable])] as SchedulerErrors[];