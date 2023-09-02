import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminFooterStateKey } from '../constants/admin-foter.constants';
import { AdminFooterState } from './admin-footer.reducer';

export const selectAdminFooterState = createFeatureSelector<AdminFooterState>(adminFooterStateKey);

export const selectAdminFooterMenu = createSelector(
  selectAdminFooterState,
  state => state.menu
);