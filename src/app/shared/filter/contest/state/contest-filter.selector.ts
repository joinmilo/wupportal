import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contestFilterStateKey } from '../constants/contest.filter.constants';
import { ContestFilterState } from './contest-filter.reducer';

export const selectContestFilterState = createFeatureSelector<ContestFilterState>(contestFilterStateKey);


export const selectTypes = createSelector(
  selectContestFilterState,
  state => state.types
);