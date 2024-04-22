import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dealFilterStateKey } from '../constants/deal-filter.constants';
import { DealFilterState } from './deal-filter.reducer';

export const selectDealFilterState = createFeatureSelector<DealFilterState>(dealFilterStateKey);

export const selectCategories = createSelector(
  selectDealFilterState,
  state => state.categories
);