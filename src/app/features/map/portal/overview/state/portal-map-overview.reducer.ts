import { createReducer, on } from '@ngrx/store';
import { DealEntity, EventEntity, FilterSortPaginateInput, OrganisationEntity } from 'src/app/core/api/generated/schema';
import { MapEntityFilter } from 'src/app/core/typings/filter-params/map-filter-param';
import { MapFeatureActions } from './portal-map-overview.actions';

export interface MapState {
  activeEntity?: MapEntityFilter;
  filterParams?: FilterSortPaginateInput;

  events?: EventEntity[]
  organisations?: OrganisationEntity[]
  deals?: DealEntity[]
}

export const initialState: MapState = {
  activeEntity: MapEntityFilter.Events,
};

export const portalMapOverviewReducer = createReducer(
  initialState,

  on(MapFeatureActions.setEntityFilter, (state, action): MapState => ({
    ...state,
    activeEntity: action.entity
  })),

  on(MapFeatureActions.setEvents, (state, action): MapState => ({
    ...state,
    events: action.events
  })),

  on(MapFeatureActions.setOrganisations, (state, action): MapState => ({
    ...state,
    organisations: action.organisations
  })),

  on(MapFeatureActions.setDeals, (state, action): MapState => ({
    ...state,
    deals: action.deals
  })),

)
