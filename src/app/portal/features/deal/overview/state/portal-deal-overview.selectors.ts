import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MarkerDefinition } from 'src/app/shared/map/typings/map';
import { DealCategoryEntity } from 'src/schema/schema';
import { portalDealOverviewStateKey } from '../constants/portal-deal-overview.constants';
import { PortalDealOverviewState } from './portal-deal-overview.reducer';

export const selectPortalDealOverviewState = createFeatureSelector<PortalDealOverviewState>(portalDealOverviewStateKey);

export const selectSponsoredDeal = createSelector(
  selectPortalDealOverviewState,
  state => state.sponsoredDeal
);

export const selectOverviewData = createSelector(
  selectPortalDealOverviewState,
  state => state.overviewData
);

export const selectOverviewDataCategories = createSelector(
  selectOverviewData,
  deals => {
    return deals?.result?.reduce((result, current) => {
      const existing = result.find(category => category.id === current?.category?.id);
      
      existing
        ? existing.deals?.push(current)
        : result.push({ ...current?.category, deals: [current] } as DealCategoryEntity);

      return result;
    }, [] as DealCategoryEntity[]);
  }
);

export const selectOverviewDataMarkers = createSelector(
  selectOverviewData,
  deals => ({
      data: deals?.result,
      entity: 'DealEntity'
    } as MarkerDefinition
  )
);

export const selectParams = createSelector(
  selectPortalDealOverviewState,
  state => state.params
);