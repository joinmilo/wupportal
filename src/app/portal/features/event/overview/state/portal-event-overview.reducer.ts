import { createReducer, on } from '@ngrx/store';
import { EventEntity, FilterSortPaginateInput, Maybe, PageableList_EventEntity } from 'src/schema/schema';
import { PortalEventOverviewActions } from './portal-event-overview.actions';

export interface PortalEventOverviewState {
  overviewData?: PageableList_EventEntity,
  params: FilterSortPaginateInput,
  sponsoredEvent?: Maybe<EventEntity>,
}

export const initialState: PortalEventOverviewState = {
  params: {}
};

export const portalEventOverviewReducer = createReducer(
  initialState,

  on(PortalEventOverviewActions.setSponsoredEvent, (state, action): PortalEventOverviewState => (
    { ...state, sponsoredEvent: action.event }
  )),
  
  on(PortalEventOverviewActions.paramsUpdated, (state, action): PortalEventOverviewState => (
    { ...state, params: action.params }
  )),

  on(PortalEventOverviewActions.setOverviewData, (state, action): PortalEventOverviewState => (
    { ...state, overviewData: action.events }
  )),
);
