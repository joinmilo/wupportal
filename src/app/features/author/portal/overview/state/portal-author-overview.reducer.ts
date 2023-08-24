import { createReducer, on } from '@ngrx/store';
import { Maybe, PageableList_UserContextEntity } from 'src/app/core/api/generated/schema';
import { PortalAuthorOverviewActions } from './portal-author-overview.actions';

export interface PortalAuthorOverviewState {
  authors?: Maybe<PageableList_UserContextEntity>,
}

export const initialState: PortalAuthorOverviewState = { };

export const portalAuthorOverviewReducer = createReducer(
  initialState,

  on(PortalAuthorOverviewActions.setOverviewData, (state, action): PortalAuthorOverviewState => (
    { ...state, authors: action.authors}
  )),  
);
