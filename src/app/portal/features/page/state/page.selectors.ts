import { createFeatureSelector, createSelector } from '@ngrx/store';
import { pageFeatureKey } from '../constants/page.constants';
import { PageState } from './page.reducer';

export const selectPageState = createFeatureSelector<PageState>(pageFeatureKey);

export const selectCurrentPage = createSelector(
  selectPageState,
  state => state.page
);
