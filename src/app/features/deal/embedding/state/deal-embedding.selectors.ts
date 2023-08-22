import { createFeatureSelector, createSelector } from '@ngrx/store';
import { dealEmbeddingStateKey } from '../constants/deal-embedding.constants';
import { DealEmbeddingState } from './deal-embedding.reducer';

export const selectDealEmbeddingState = createFeatureSelector<DealEmbeddingState>(dealEmbeddingStateKey);

export const selectRecentDeals = createSelector(
  selectDealEmbeddingState,
  state => state.recentDeals
);