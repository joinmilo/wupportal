import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventAdminDetailsRatingStateKey } from '../constants/event-admin-details-rating.constants';
import { EventAdminDetailsRatingState } from './event-admin-details-rating.reducer';

export const selectEventAdminDetailsRatingState = createFeatureSelector<EventAdminDetailsRatingState>(eventAdminDetailsRatingStateKey);

export const selectSlug = createSelector(
  selectEventAdminDetailsRatingState,
  state => state.slug
);

export const selectParams = createSelector(
  selectEventAdminDetailsRatingState,
  state => state.params
);

export const selectRatingStatistics = createSelector(
  selectEventAdminDetailsRatingState,
  state => state.statistics
);