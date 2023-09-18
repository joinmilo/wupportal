import { createReducer, on } from '@ngrx/store';
import { PageableList_LabelEntity } from 'src/app/core/api/generated/schema';
import { AdminSettingsLabelActions } from './admin-settings-label.actions';

export interface AdminSettingsLabelState {
  labels?: PageableList_LabelEntity,
}

export const initialState: AdminSettingsLabelState = { };

export const adminSettingsLabelReducer = createReducer(
  initialState,

  on(AdminSettingsLabelActions.setOverviewData, (state, action): AdminSettingsLabelState => (
    { ...state, labels: action.labels }
  )),
);
