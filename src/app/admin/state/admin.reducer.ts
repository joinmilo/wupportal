import { createReducer, on } from '@ngrx/store';
import { FeatureEntity, Maybe } from 'src/schema/schema';
import { AdminActions } from './admin.actions';

export interface AdminState {
  features?: Maybe<FeatureEntity[]>,
  menuOpen?: boolean,
}

export const initialState: AdminState = {};

export const adminReducer = createReducer(
  initialState,

  on(AdminActions.toggleMenu, (state): AdminState => (
    { ...state, menuOpen: !state.menuOpen }
  )),

  on(AdminActions.setFeatures, (state, action): AdminState => (
    { ...state, features: action.features }
  )),

);
