import { createReducer, on } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, PageableList_RoleEntity, RoleEntity, RolePrivilegeEntity, UserEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsRoleActions } from './admin-settings-role.actions';

export interface AdminSettingsRoleState {
  roles?: PageableList_RoleEntity,
  params: FilterSortPaginateInput,
  editRole?: Maybe<RoleEntity>,
  privileges?: RolePrivilegeEntity[],
  users?: UserEntity[],
}

export const initialState: AdminSettingsRoleState = {
  params: {}
};

export const adminSettingsRoleReducer = createReducer(
  initialState,

  on(AdminSettingsRoleActions.updateParams, (state, action): AdminSettingsRoleState => (
    { ...state, params: Object.assign({ ...state.params } || {}, action.params) }
  )),

  on(AdminSettingsRoleActions.roleRetrieved, (state, action): AdminSettingsRoleState => (
    { ...state, editRole: action.entity }
  )),

  on(AdminSettingsRoleActions.setOverviewData, (state, action): AdminSettingsRoleState => (
    { ...state, roles: action.roles }
  )),

  on(AdminSettingsRoleActions.privilegesRetrieved, (state, action): AdminSettingsRoleState => (
    { ...state, privileges: action.result }
  )),

  on(AdminSettingsRoleActions.usersRetrieved, (state, action): AdminSettingsRoleState => (
    { ...state, users: action.result }
  )),

  on(
    AdminSettingsRoleActions.saved,
    AdminSettingsRoleActions.cancelled,
    (state): AdminSettingsRoleState => (
      { ...state, editRole: undefined }
    )
  ),
);
