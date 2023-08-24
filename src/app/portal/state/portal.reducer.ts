import { createReducer, on } from '@ngrx/store';
import { Maybe, MenuItemEntity } from 'src/app/core/api/generated/schema';
import { PortalActions } from './portal.actions';

export interface PortalState {
  menu?: Maybe<MenuItemEntity[]>,
}

export const initialState: PortalState = {
};

export const portalReducer = createReducer(
  initialState,

  on(PortalActions.setMenu, (state, action): PortalState => (
    { ...state, menu: action.menuItems }
  )),

);
