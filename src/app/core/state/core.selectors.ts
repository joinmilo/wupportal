import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coreFeatureKey } from '../constants/core.constants';
import { CoreState } from './core.reducer';

export const selectCoreState = createFeatureSelector<CoreState>(coreFeatureKey);

export const selectLanguage = createSelector(
  selectCoreState,
  state => state?.language
);