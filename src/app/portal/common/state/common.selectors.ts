import { createFeatureSelector, createSelector } from '@ngrx/store';
import { commonFeatureKey } from '../constants/common.constants';
import { CommonState } from './common.reducer';

export const selectCommonState = createFeatureSelector<CommonState>(commonFeatureKey);

export const selectCurrentMenu = createSelector(
  selectCommonState,
  state => state.menu

);