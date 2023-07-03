import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MapEntityFilter } from 'src/app/core/typings/filter-params/map-filter-param';
import { MarkerDefinition } from 'src/app/shared/map/typings/map';
import { portalPortalOverviewState } from '../constants/portal-map-overview.constants';
import { MapState } from './portal-map-overview.reducer';

export const selectMapState = createFeatureSelector<MapState>(portalPortalOverviewState);

export const selectActiveEntityFilter = createSelector(
  selectMapState, (state) => state.activeEntity
);

export const selectResult = createSelector(
  selectMapState,
  selectActiveEntityFilter,
  (state, entityType) => {
    switch (entityType) {
      case MapEntityFilter.Deals:
        return {
          data: state.deals,
          entity: 'DealEntity'
        } as MarkerDefinition;
      case MapEntityFilter.Events:
        return {
          data: state.events,
          entity: 'EventEntity'
        } as MarkerDefinition;
      case MapEntityFilter.Organisations:
        return {
          data: state.organisations,
          entity: 'OrganisationEntity'
        } as MarkerDefinition;
      default: return null
    }
  }
);
