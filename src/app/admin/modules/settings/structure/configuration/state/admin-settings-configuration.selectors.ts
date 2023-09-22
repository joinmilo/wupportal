import { createFeatureSelector, createSelector } from '@ngrx/store';
import { adminSettingsConfigurationStateKey } from '../constants/admin-settings-configuration.constants';
import { AdminSettingsConfigurationState } from './admin-settings-configuration.reducer';

export const selectAdminSettingsConfigurationState = createFeatureSelector<AdminSettingsConfigurationState>(adminSettingsConfigurationStateKey);

export const selectConfigurations = createSelector(
  selectAdminSettingsConfigurationState,
  state => state.configurations
);

export const selectParams = createSelector(
  selectAdminSettingsConfigurationState,
  state => state.params
);
