import { createReducer, on } from '@ngrx/store';
import { EventEntity, FilterSortPaginateInput, Maybe, PageableList_EventEntity } from 'src/schema/schema';
import { PortalEventOverviewActions } from './portal-event-overview.actions';

export interface PortalEventOverviewState {
  overviewData?: PageableList_EventEntity,
  sponsoredEvent?: Maybe<EventEntity>,
  tableData?: PageableList_EventEntity,
  tableParams?: FilterSortPaginateInput,
}

export const initialState: PortalEventOverviewState = { };

export const portalEventOverviewReducer = createReducer(
  initialState,

  on(PortalEventOverviewActions.setSponsoredEvent, (state, action): PortalEventOverviewState => (
    { ...state, sponsoredEvent: action.event }
  )),

  on(PortalEventOverviewActions.setOverviewData, (state, action): PortalEventOverviewState => (
    { ...state, overviewData: action.events }
  )),
);
