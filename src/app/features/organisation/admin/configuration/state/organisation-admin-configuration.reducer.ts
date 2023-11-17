import { createReducer, on } from '@ngrx/store';
import { Maybe, OrganisationConfigurationEntity, RoleEntity } from 'src/app/core/api/generated/schema';
import { OrganisationAdminConfigurationActions } from './organisation-admin-configuration.actions';

export interface OrganisationAdminConfigurationState {
  editConfiguration?: Maybe<OrganisationConfigurationEntity>;
  roles?: Maybe<RoleEntity[]>,
}

export const initialState: OrganisationAdminConfigurationState = { };

export const organisationAdminConfigurationReducer = createReducer(
  initialState,

  on(
    OrganisationAdminConfigurationActions.setOrganisationConfiguration,
    (state, action): OrganisationAdminConfigurationState => ({
      ...state, editConfiguration: action.configuration
    })),

  on(OrganisationAdminConfigurationActions.rolesRetrieved, (state, action): OrganisationAdminConfigurationState => (
    { ...state, roles: action.result }
  )),

);
