import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mediaFilterStateKey } from '../constants/media-filter.constants';
import { MediaFilterState } from './media-filter.reducer';

export const selectMediaFilterState = createFeatureSelector<MediaFilterState>(mediaFilterStateKey);

export const selectCategories = createSelector(
  selectMediaFilterState,
  state => state.categories
);
