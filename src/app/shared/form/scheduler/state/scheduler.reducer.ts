import { createReducer, on } from '@ngrx/store';
import { Maybe } from 'src/app/core/api/generated/schema';
import { Period } from 'src/app/core/typings/period';
import { Recurrence, RecurrenceEnd, SchedulerErrors } from '../typings/scheduler';
import { addError, calculateSchedules, removeError } from '../utils/scheduler.utils';
import { SchedulerActions } from './scheduler.actions';

export interface SchedulerState {
  touched: boolean,

  columns: number,
  initRecurrenceEnd: RecurrenceEnd,
  lefthandColumns: number,
  numberColumns: number,

  initSchedule?: Period,

  recurrenceType: Recurrence,
  recurrenceInterval?: Maybe<number>,
  recurrenceEndAfterTimes?: Maybe<number>,
  recurrenceEndUntilDate?: Maybe<Date>,

  errors: SchedulerErrors[],
  result: Period[],
}

export const initialState: SchedulerState = {
  touched: false,

  columns: 11,
  initRecurrenceEnd: 'until',
  lefthandColumns: 5,
  numberColumns: 3,

  recurrenceType: 'noRecurrence',

  errors: [],
  result: [],
};

export const schedulerReducer = createReducer(
  initialState,

  //TODO: Do this again when refreshed....
  on(SchedulerActions.updatedInitSchedule, (state, action): SchedulerState => {
    if (action.start && action.end && action.formValid) {
      const initSchedule = {
        startDate: action.start,
        endDate: action.end
      };

      let result = state.result ? [...state.result] : [];
      if (state.result) {
        result = result.filter(entry => !(entry.startDate === state.initSchedule?.startDate
          && entry.endDate === state.initSchedule?.endDate));
      }

      return {...state, 
        errors: removeError(state, 'startAndEndDateInvalid'),
        result: [...result, initSchedule],
        initSchedule
      }
    } else {
      return { ...state,
        errors: addError(state, 'startAndEndDateInvalid'),
        initSchedule: undefined,
      };
    }
  }),

  on(SchedulerActions.updatedInterval, (state, action): SchedulerState =>
    action.formValid
      ? { ...state,
          recurrenceInterval: action.interval,
          errors: removeError(state, 'scheduleIntervalNotValid')
        }
      : { ...state, errors: addError(state, 'scheduleIntervalNotValid') }
  ),

  on(SchedulerActions.updatedRecurrenceEndAfterTimes, (state, action): SchedulerState => (
    { ...state,
      recurrenceEndAfterTimes: action.times,
      errors: removeError(state, 'eitherAfterTimesOrEndDate')
    }
  )),

  on(SchedulerActions.updatedRecurrenceEndDate, (state, action): SchedulerState => (
    { ...state,
      recurrenceEndUntilDate: action.date,
      errors: removeError(state, 'eitherAfterTimesOrEndDate')
    }
  )),

  on(SchedulerActions.updatedRecurrenceType, (state, action): SchedulerState => (
    { ...state, recurrenceType: action.recurrenceType }
  )),

  on(SchedulerActions.setResult, (state, action): SchedulerState => (
    { ...state, result: action.result }
  )),

  on(SchedulerActions.addError, (state, action): SchedulerState => (
    { ...state, errors: addError(state, action.error) }
  )),

  on(SchedulerActions.generateResult, (state): SchedulerState => (
    { ...state,
        result: calculateSchedules({
          initialSchedule: state.initSchedule,
          interval: (state.recurrenceInterval ?? 1),
          recurrence: (state.recurrenceType ?? 'daily'),
          repeatTimes: state.recurrenceEndAfterTimes,
          untilDate: state.recurrenceEndUntilDate,
        })
    }
  )),
);

