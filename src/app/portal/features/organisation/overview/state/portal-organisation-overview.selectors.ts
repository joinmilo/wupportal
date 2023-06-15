import { createFeatureSelector, createSelector } from '@ngrx/store';
import { distinctStartDates } from 'src/app/core/utils/schedule.utils';
import { OrganisationCategoryEntity } from 'src/schema/schema';
import { portalOrganisationOverviewStateKey } from '../constants/portal-Organisation-overview.constants';
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

export const selectOverviewDataCategories = createSelector(
  selectOverviewData,
  Organisations => {
    return Organisations?.result?.reduce((result, current) => {
      const existing = result.find(category => category.id === current?.category?.id);
      
      existing
        ? existing.Organisations?.push(current)
        : result.push({ ...current?.category, Organisations: [current] } as OrganisationCategoryEntity);

      return result;
    }, [] as OrganisationCategoryEntity[]);
  }
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