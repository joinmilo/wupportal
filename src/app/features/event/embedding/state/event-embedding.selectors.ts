import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventEmbeddingStateKey } from '../constants/event-embedding.constants';
import { EventEmbeddingState } from './event-embedding.reducer';

export const selectEventEmbeddingState = createFeatureSelector<EventEmbeddingState>(eventEmbeddingStateKey);

export const selectRecentEvents = createSelector(
  selectEventEmbeddingState,
  state => state.recentEvents
);