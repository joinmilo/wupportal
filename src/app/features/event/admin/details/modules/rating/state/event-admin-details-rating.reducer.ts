import { createReducer, on } from '@ngrx/store';

import { AnalyticsDto, Maybe } from 'src/app/core/api/generated/schema';
import { AnalyticsParams } from 'src/app/shared/widgets/analytics/typings/analytics';
import { EventAdminDetailsRatingActions } from './event-admin-details-rating.actions';

export interface EventAdminDetailsRatingState {
  slug?: Maybe<string>;
  params?: AnalyticsParams,

  statistics?: Maybe<AnalyticsDto[]>;
}

export const initialState: EventAdminDetailsRatingState = {
};

export const eventAdminDetailsRatingReducer = createReducer(
  initialState,

  on(EventAdminDetailsRatingActions.setSlug, (state, action): EventAdminDetailsRatingState => (
    { ...state, slug: action.slug }
  )),

  on(EventAdminDetailsRatingActions.updateParams, (state, action): EventAdminDetailsRatingState => (
    { ...state, params: action.params }
  )),

  on(EventAdminDetailsRatingActions.setStatistics, (state, action): EventAdminDetailsRatingState => (
    { ...state, statistics: action.result }
  )),
);



