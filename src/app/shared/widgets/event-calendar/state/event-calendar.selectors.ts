import { createFeatureSelector, createSelector } from '@ngrx/store';
import { distinctStartDates } from 'src/app/core/utils/schedule.utils';
import { eventCalendarStateKey } from '../constants/event-calendar.constants';
import { EventCalendarState } from './event-calendar.reducer';

export const selectEventCalendarState = createFeatureSelector<EventCalendarState>(eventCalendarStateKey);

export const selectSelectedEvents = createSelector(
  selectEventCalendarState,
  state => state.events
);

export const selectSelectedDay = createSelector(
  selectEventCalendarState,
  state => state.selectedDay
);

export const selectEventParams = createSelector(
  selectEventCalendarState,
  state => state.eventParams
);

export const selectScheduleParams = createSelector(
  selectEventCalendarState,
  state => state.scheduleParams
);

export const selectSchedules = createSelector(
  selectEventCalendarState,
  state => state.schedules
);

export const selectDistinctSchedules = createSelector(
  selectSchedules,
  schedules => distinctStartDates(schedules)
);
