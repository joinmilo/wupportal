import { createReducer, on } from '@ngrx/store';

import { AnalyticsDto, Maybe } from 'src/app/core/api/generated/schema';
import { AnalyticsParams } from 'src/app/shared/widgets/analytics/typings/analytics';
import { EventAdminDetailsVisitorsActions } from './event-admin-details-visitors.actions';

export interface EventAdminDetailsVisitorsState {
  slug?: Maybe<string>;
  params?: AnalyticsParams,

  statistics?: Maybe<AnalyticsDto[]>;
}

export const initialState: EventAdminDetailsVisitorsState = {
};

export const eventAdminDetailsVisitorsReducer = createReducer(
  initialState,

  on(EventAdminDetailsVisitorsActions.setSlug, (state, action): EventAdminDetailsVisitorsState => (
    { ...state, slug: action.slug }
  )),

  on(EventAdminDetailsVisitorsActions.updateParams, (state, action): EventAdminDetailsVisitorsState => (
    { ...state, params: action.params }
  )),

  on(EventAdminDetailsVisitorsActions.setStatistics, (state, action): EventAdminDetailsVisitorsState => (
    { ...state, statistics: action.result }
  )),
);



