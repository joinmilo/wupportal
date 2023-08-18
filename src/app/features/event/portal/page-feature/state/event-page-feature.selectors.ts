import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventPageFeatureStateKey } from '../constants/event-page-feature.constants';
import { EventPageFeatureState } from './event-page-feature.reducer';

export const selectEventPageFeatureState = createFeatureSelector<EventPageFeatureState>(eventPageFeatureStateKey);

export const selectRecentEvents = createSelector(
  selectEventPageFeatureState,
  state => state.recentEvents
);