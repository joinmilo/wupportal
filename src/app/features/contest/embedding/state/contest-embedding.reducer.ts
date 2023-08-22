import { createReducer, on } from '@ngrx/store';
import { ContestEntity, Maybe } from 'src/schema/schema';
import { ContestEmbeddingActions } from './contest-embedding.actions';

export interface ContestEmbeddingState {
  recentContests?: Maybe<ContestEntity[]>,
}

export const initialState: ContestEmbeddingState = { };

export const contestEmbeddingReducer = createReducer(
  initialState,

  on(ContestEmbeddingActions.setRecentContests, (state, action): ContestEmbeddingState => (
    { ...state, recentContests: action.contests }
  )),
);
