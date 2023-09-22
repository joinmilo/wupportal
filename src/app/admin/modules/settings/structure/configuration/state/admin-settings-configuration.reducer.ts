import { createReducer, on } from '@ngrx/store';
import { FilterSortPaginateInput, PageableList_ConfigurationEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsConfiguratioActions } from './admin-settings-configuration.actions';

export interface AdminSettingsConfigurationState {
  configurations?: PageableList_ConfigurationEntity,
  params?: FilterSortPaginateInput,
}

export const initialState: AdminSettingsConfigurationState = { };

export const adminSettingsConfigurationReducer = createReducer(
  initialState,

  on(AdminSettingsConfiguratioActions.updateParams, (state, action): AdminSettingsConfigurationState => (
    { ...state, params: action.params }
  )),

  on(AdminSettingsConfiguratioActions.setOverviewData, (state, action): AdminSettingsConfigurationState => (
    { ...state, configurations: action.configurations }
  )),
);
