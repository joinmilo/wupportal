import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventFeatureKey } from '../constants/event.constant';
import { EventState } from './event.reducer';

export const selectEventState = createFeatureSelector<EventState>(eventFeatureKey);

export const selectEventDetails = createSelector(
  selectEventState,
  state => state.eventDetails
);