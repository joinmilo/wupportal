import { createFeatureSelector, createSelector } from '@ngrx/store';
import { organisationAdminConfigurationStateKey } from '../constants/organisation-admin-configuration.constants';
import { OrganisationAdminConfigurationState } from './organisation-admin-configuration.reducer';

export const selectOrganisationAdminConfigurationState = createFeatureSelector<OrganisationAdminConfigurationState>(organisationAdminConfigurationStateKey);

export const selectEditableConfiguration = createSelector(
  selectOrganisationAdminConfigurationState,
  state => state.editConfiguration
);

export const selectRoles = createSelector(
  selectOrganisationAdminConfigurationState,
  state => state.roles
);