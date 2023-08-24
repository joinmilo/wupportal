import { createReducer, on } from '@ngrx/store';
import { EventEntity, Maybe } from 'src/app/core/api/generated/schema';
import { EventEmbeddingActions } from './event-embedding.actions';

export interface EventEmbeddingState {
  recentEvents?: Maybe<EventEntity[]>,
}

export const initialState: EventEmbeddingState = { };

export const eventEmbeddingReducer = createReducer(
  initialState,

  on(EventEmbeddingActions.setRecentEvents, (state, action): EventEmbeddingState => (
    { ...state, recentEvents: action.events }
  )),
);
