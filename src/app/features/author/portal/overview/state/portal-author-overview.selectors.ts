import { createFeatureSelector, createSelector } from '@ngrx/store';
import { portalAuthorOverviewStateKey } from '../constants/portal-author-overview.constants';
import { PortalAuthorOverviewState } from './portal-author-overview.reducer';


export const selectPortalAuthorOverviewState = createFeatureSelector<PortalAuthorOverviewState>(portalAuthorOverviewStateKey);

export const selectAuthors = createSelector (
  selectPortalAuthorOverviewState,
  state => state.authors
)