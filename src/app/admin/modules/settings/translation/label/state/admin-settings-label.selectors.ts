import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminSettingsLabelStateKey } from '../constants/admin-settings-label.constants';
import { AdminSettingsLabelState } from './admin-settings-label.reducer';

export const selectAdminSettingsLabelState = createFeatureSelector<AdminSettingsLabelState>(adminSettingsLabelStateKey);

export const selectLabels = createSelector(
  selectAdminSettingsLabelState,
  state => state.labels
);
