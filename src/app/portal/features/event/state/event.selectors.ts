import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventToCard } from 'src/app/core/utils/card.utils';
import { eventFeatureKey } from '../constants/event.constant';
import { EventState } from './event.reducer';

export const selectEventState = createFeatureSelector<EventState>(eventFeatureKey);

export const selectSponsoredEvent = createSelector(
  selectEventState,
  state => state.sponsoredEvent
);

export const selectSponsoredCard = createSelector(
  selectSponsoredEvent,
  event => eventToCard(event)
);

export const selectEventDetails = createSelector(
  selectEventState,
  state => state.eventDetails
);