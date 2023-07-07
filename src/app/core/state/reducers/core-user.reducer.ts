import { createReducer, on } from '@ngrx/store';
import { UserContextEntity } from 'src/schema/schema';
import { CoreUserActions } from '../actions/core-user.actions';

export interface CoreUserState {
  currentUser?: UserContextEntity,
}

export const initialState: CoreUserState = { };

export const coreUserReducer = createReducer(
  initialState,

  on(CoreUserActions.getMe, (state, action): CoreUserState => (
    { ...state, currentUser: action.user }
  )),

  on(CoreUserActions.logout, (state): CoreUserState => (
    { ...state, currentUser: undefined }
  )),

);
