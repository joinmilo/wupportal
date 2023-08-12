import { createReducer, on } from '@ngrx/store';
import { Maybe, PageEntity } from 'src/schema/schema';
import { PortalLandingActions } from './portal-landing.actions';

export interface PortalLandingState {
  page?: Maybe<PageEntity>,
}

export const initialState: PortalLandingState = { };

export const portalLandingReducer = createReducer(
  initialState,

  on(PortalLandingActions.setLandingPage, (state, action): PortalLandingState => (
    { ...state, page: action.page }
  )),

);
