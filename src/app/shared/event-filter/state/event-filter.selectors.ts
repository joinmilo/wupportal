import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventFilterStateKey } from '../constants/event-filter.constants';
import { createParams } from '../utils/param-builder.utils';
import { EventFilterState } from './event-filter.reducer';

export const selectEventFilterState = createFeatureSelector<EventFilterState>(eventFilterStateKey);

export const selectFiltersActive = createSelector(
  selectEventFilterState,
  state => state?.params
    && Object.values(state.params).some((value) => typeof value === 'boolean'
      ? value
      : !!value?.length)
);

export const selectCategories = createSelector(
  selectEventFilterState,
  state => state.categories
);

export const selectTargetGroups = createSelector(
  selectEventFilterState,
  state => state.targetGroups
);

export const selectParams = createSelector(
  selectEventFilterState,
  state => state?.params
);

export const selectFilterParams = createSelector(
  selectParams,
  params => createParams(params)
);