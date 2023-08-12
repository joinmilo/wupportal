import { createReducer, on } from '@ngrx/store';
import { Maybe, PageEntity } from 'src/schema/schema';
import { PortalPageActions } from './portal-page.actions';

export interface PortalPageState {
  page?: Maybe<PageEntity>,
}

export const initialState: PortalPageState = { };

export const portalPageReducer = createReducer(
  initialState,

  on(PortalPageActions.setPage, (state, action): PortalPageState => (
    { ...state, page: action.page }
  )),

);
