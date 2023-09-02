import { createReducer, on } from '@ngrx/store';
import { AdminFooterParentEntity, Maybe } from 'src/app/core/api/generated/schema';
import { AdminFooterActions } from './admin-footer.actions';

export interface AdminFooterState {
  menu?: Maybe<AdminFooterParentEntity[]>,
}

export const initialState: AdminFooterState = { };

export const adminFooterReducer = createReducer(
  initialState,

  on(AdminFooterActions.setAdminMenu, (state, action): AdminFooterState => (
    { ...state, menu: action.menu }
  )),

);
