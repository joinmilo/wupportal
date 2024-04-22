import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventFilterStateKey } from '../constants/event-filter.constants';
import { EventFilterState } from './event-filter.reducer';

export const selectEventFilterState = createFeatureSelector<EventFilterState>(eventFilterStateKey);

export const selectCategories = createSelector(
  selectEventFilterState,
  state => state.categories
);

export const selectTargetGroups = createSelector(
  selectEventFilterState,
  state => state.targetGroups
);