import { Maybe } from 'graphql/jsutils/Maybe';

export type Recurrence = 'noRecurrence'
| 'daily'
| 'weekly'
| 'monthly'
| 'yearly';

export type RecurrenceEnd = 'on'
| 'after';

export type RecurrenceOptions = {
  recurrence: Recurrence,
  interval: number,
  untilDate?: Maybe<Date>,
  repeatTimes?: Maybe<number>,
};