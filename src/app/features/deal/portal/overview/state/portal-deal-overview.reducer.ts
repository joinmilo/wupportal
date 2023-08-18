import { createReducer, on } from '@ngrx/store';
import { DealEntity, FilterSortPaginateInput, Maybe, PageableList_DealEntity } from 'src/schema/schema';
import { PortalDealOverviewActions } from './portal-deal-overview.actions';

export interface PortalDealOverviewState {
  overviewData?: PageableList_DealEntity,
  params: FilterSortPaginateInput,
  sponsoredDeal?: Maybe<DealEntity>,
}

export const initialState: PortalDealOverviewState = {
  params: {}
};

export const portalDealOverviewReducer = createReducer(
  initialState,

  on(PortalDealOverviewActions.setSponsoredDeal, (state, action): PortalDealOverviewState => (
    { ...state, sponsoredDeal: action.deal }
  )),
  
  on(PortalDealOverviewActions.updateParams, (state, action): PortalDealOverviewState => (
    { ...state, params: Object.assign({ ...state.params } || {}, action.params) }
  )),

  on(PortalDealOverviewActions.setOverviewData, (state, action): PortalDealOverviewState => (
    { ...state, overviewData: action.deals }
  )),
);
