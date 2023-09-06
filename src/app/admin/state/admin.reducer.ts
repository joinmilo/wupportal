import { createReducer, on } from '@ngrx/store';
import { FeatureEntity, Maybe } from 'src/app/core/api/generated/schema';
import { AdminRoutes } from '../typings/menu';
import { AdminActions } from './admin.actions';

export interface AdminState {
  features?: Maybe<FeatureEntity[]>,
  menuOpen?: boolean,
  mainRoutes: AdminRoutes[],
  settingsRoutes: AdminRoutes[],
}

export const initialState: AdminState = {
  mainRoutes: [],
  settingsRoutes: [],
};

export const adminReducer = createReducer(
  initialState,

  on(AdminActions.openMenu, (state): AdminState => (
    { ...state, menuOpen: true }
  )),

  on(AdminActions.closeMenu, (state): AdminState => (
    { ...state, menuOpen: false }
  )),

  on(AdminActions.addMainRoutes, (state, action): AdminState => (
    { ...state, mainRoutes: [...state.mainRoutes, action.routes] }
  )),

  on(AdminActions.addSettingsRoutes, (state, action): AdminState => (
    { ...state, settingsRoutes: [...state.settingsRoutes, action.routes] }
  )),

  on(AdminActions.setFeatures, (state, action): AdminState => (
    { ...state, features: action.features }
  )),

);
