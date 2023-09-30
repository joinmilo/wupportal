import { Maybe } from 'graphql/jsutils/Maybe';
import { Period } from 'src/app/core/typings/period';

export type Recurrence = 'noRecurrence'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly';

export type RecurrenceEnd = 'until'
  | 'after';

export type RecurrenceOptions = {
  initialSchedule?: Period,
  recurrence: Recurrence,
  interval: number,
  untilDate?: Maybe<Date>,
  repeatTimes?: Maybe<number>,
};

export type SchedulerErrors = 'startAndEndDateInvalid'
  | 'scheduleIntervalNotValid'
  | 'eitherAfterTimesOrEndDate'
