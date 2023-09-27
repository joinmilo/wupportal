import { createReducer, on } from '@ngrx/store';
import { AddressEntity, FilterSortPaginateInput, Maybe, PageableList_AddressEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsAddressActions } from './admin-settings-address.actions';

export interface AdminSettingsAddressState {
  addresses?: PageableList_AddressEntity,
  editAddress?: Maybe<AddressEntity>,
  params: FilterSortPaginateInput
}

export const initialState: AdminSettingsAddressState = {
  params: {}
};

export const adminSettingsAddressReducer = createReducer(
  initialState,

  on(AdminSettingsAddressActions.updateParams, (state, action): AdminSettingsAddressState => (
    { ...state, params: Object.assign({ ...state.params } || {}, action.params) }
  )),

  on(AdminSettingsAddressActions.setOverviewData, (state, action): AdminSettingsAddressState => (
    { ...state, addresses: action.addresss }
  )),

  on(AdminSettingsAddressActions.addressRetrieved, (state, action): AdminSettingsAddressState => (
    { ...state, editAddress: action.entity }
  )),

  on(
    AdminSettingsAddressActions.saved,
    AdminSettingsAddressActions.cancelled,
    (state): AdminSettingsAddressState => (
      { ...state, editAddress: undefined }
    )
  ),
);
