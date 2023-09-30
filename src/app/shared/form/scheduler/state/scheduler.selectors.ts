import { createFeatureSelector, createSelector } from '@ngrx/store';
import { schedulerStateKey } from '../constants/scheduler.constants';
import { SchedulerState } from './scheduler.reducer';

export const selectSchedulerState = createFeatureSelector<SchedulerState>(schedulerStateKey);

export const selectColumns = createSelector(
  selectSchedulerState,
  state => state.columns
);

export const selectInitSchedule = createSelector(
  selectSchedulerState,
  state => state.initSchedule
);

export const selectInitRecurrenceEnd = createSelector(
  selectSchedulerState,
  state => state.initRecurrenceEnd
);

export const selectLefthandColumns = createSelector(
  selectSchedulerState,
  state => state.lefthandColumns
);

export const selectNumberColumns = createSelector(
  selectSchedulerState,
  state => state.numberColumns
);

export const selectRecurrenceType = createSelector(
  selectSchedulerState,
  state => state.recurrenceType
);

export const selectErrors = createSelector(
  selectSchedulerState,
  state => state.errors
);

export const selectResult = createSelector(
  selectSchedulerState,
  state => state.result
);

export const selectGenerationPerformed = createSelector(
  selectSchedulerState,
  state => state.generationPerformed
);