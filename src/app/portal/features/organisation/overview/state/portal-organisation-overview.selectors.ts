import { createFeatureSelector, createSelector } from '@ngrx/store';
import { distinctStartDates } from 'src/app/core/utils/schedule.utils';
import { portalOrganisationOverviewStateKey } from '../constants/portal-organisation-overview.constants';
import { PortalOrganisationOverviewState } from './portal-organisation-overview.reducer';

export const selectPortalOrganisationOverviewState = createFeatureSelector<PortalOrganisationOverviewState>(portalOrganisationOverviewStateKey);

export const selectSponsoredOrganisation = createSelector(
  selectPortalOrganisationOverviewState,
  state => state.sponsoredOrganisation
);

export const selectOverviewData = createSelector(
  selectPortalOrganisationOverviewState,
  state => state.overviewData
);

export const selectParams = createSelector(
  selectPortalOrganisationOverviewState,
  state => state.params
);

export const selectRawParams = createSelector(
  selectPortalOrganisationOverviewState,
  state => state.rawFilterParams
);

export const selectSchedules = createSelector(
  selectPortalOrganisationOverviewState,
  state => state.schedules
);

export const selectDistinctSchedules = createSelector(
  selectSchedules,
  schedules => distinctStartDates(schedules)
);