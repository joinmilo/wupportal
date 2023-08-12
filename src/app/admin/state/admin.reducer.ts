import { createReducer, on } from '@ngrx/store';
import { AdminActions } from './admin.actions';

export interface AdminState {
  menuOpen?: boolean,
}

export const initialState: AdminState = {};

export const adminReducer = createReducer(
  initialState,

  on(AdminActions.toggleMenu, (state): AdminState => (
    { ...state, menuOpen: !state.menuOpen }
  )),

);
