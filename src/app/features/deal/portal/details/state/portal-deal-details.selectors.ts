import { createFeatureSelector, createSelector } from '@ngrx/store';
import { portalDealDetailsStateKey } from '../constants/deal-details.constant';
import { PortalDealDetailsState } from './portal-deal-details.reducer';

export const selectPortalDealDetailsState = createFeatureSelector<PortalDealDetailsState>(portalDealDetailsStateKey);

export const selectDealDetails = createSelector(
  selectPortalDealDetailsState,
  state => state.details
);

export const selectDealMedia = createSelector(
  selectDealDetails,
  state => state?.uploads?.map(upload => upload?.media ?? {})
);

