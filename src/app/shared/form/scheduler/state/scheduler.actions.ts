import { createActionGroup, emptyProps } from '@ngrx/store';
import { Maybe } from 'src/app/core/api/generated/schema';
import { Period } from 'src/app/core/typings/period';
import { Recurrence, SchedulerErrors } from '../typings/scheduler';

export const SchedulerActions = createActionGroup({
  source: 'Scheduler',
  events: {
    'updated recurrence end date': (date: Date) => ({ date }),
    'updated recurrence end after times': (times: number) => ({ times }),
    'updated init schedule': (start?: Maybe<Date>, end?: Maybe<Date>, formValid?: boolean) => ({ start, end, formValid }),
    'updated interval': (interval?: Maybe<number>, formValid?: boolean) => ({ interval, formValid }),
    'updated recurrence type': (recurrenceType: Recurrence) => ({ recurrenceType }),

    'add error': (error: SchedulerErrors) => ({ error }),

    'set result': (result: Period[]) => ({ result }),
    'generate result': emptyProps(),
    'add new schedules': emptyProps(),

    'delete': (index: number) => ({ index }),
    'delete all': emptyProps(),
  }
});
