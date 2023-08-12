import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminStateKey } from '../constants/admin.constants';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>(adminStateKey);

export const selectIsAdminMenuOpen = createSelector(
  selectAdminState,
  state => state.menuOpen
);