import { createFeatureSelector, createSelector } from '@ngrx/store';
import { portalLandingStateKey } from '../constants/portal-landing.constants';
import { PortalLandingState } from './portal-landing.reducer';

export const selectPortalLandingState = createFeatureSelector<PortalLandingState>(portalLandingStateKey);

export const selectLandingPage = createSelector(
  selectPortalLandingState,
  state => state.page
);