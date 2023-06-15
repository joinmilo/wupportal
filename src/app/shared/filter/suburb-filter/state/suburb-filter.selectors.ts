import { createFeatureSelector, createSelector } from '@ngrx/store';
import { suburbFilterStateKey } from '../constants/suburb-filter.constants';
import { SuburbFilterState } from './suburb-filter.reducer';

export const selectSuburbFilterState = createFeatureSelector<SuburbFilterState>(suburbFilterStateKey);

export const selectSuburbs = createSelector(
  selectSuburbFilterState,
  state => state.suburbs
);