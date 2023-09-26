import { createReducer, on } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, PageableList_SuburbEntity, SuburbEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsSuburbActions } from './admin-settings-suburb.actions';

export interface AdminSettingsSuburbState {
  overviewData?: PageableList_SuburbEntity,
  editSuburb?: Maybe<SuburbEntity>,
  params: FilterSortPaginateInput
}

export const initialState: AdminSettingsSuburbState = {
  params: {}
};

export const adminSettingsSuburbReducer = createReducer(
  initialState,

  on(AdminSettingsSuburbActions.updateParams, (state, action): AdminSettingsSuburbState => (
    { ...state, params: Object.assign({ ...state.params } || {}, action.params) }
  )),

  on(AdminSettingsSuburbActions.setOverviewData, (state, action): AdminSettingsSuburbState => (
    { ...state, overviewData: action.suburbs }
  )),

  on(AdminSettingsSuburbActions.suburbRetrieved, (state, action): AdminSettingsSuburbState => (
    { ...state, editSuburb: action.entity }
  )),

  on(
    AdminSettingsSuburbActions.saved,
    AdminSettingsSuburbActions.cancelled,
    (state): AdminSettingsSuburbState => (
      { ...state, editSuburb: undefined }
    )
  ),
);
