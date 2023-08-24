import { createReducer, on } from '@ngrx/store';
import { DealEntity, Maybe } from 'src/app/core/api/generated/schema';
import { DealEmbeddingActions } from './deal-embedding.actions';

export interface DealEmbeddingState {
  recentDeals?: Maybe<DealEntity[]>,
}

export const initialState: DealEmbeddingState = { };

export const dealEmbeddingReducer = createReducer(
  initialState,

  on(DealEmbeddingActions.setRecentDeals, (state, action): DealEmbeddingState => (
    { ...state, recentDeals: action.deals }
  )),
);
