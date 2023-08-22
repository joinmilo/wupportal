import { createFeatureSelector, createSelector } from '@ngrx/store';
import { contestEmbeddingStateKey } from '../constants/contest-embedding.constants';
import { ContestEmbeddingState } from './contest-embedding.reducer';

export const selectContestEmbeddingState = createFeatureSelector<ContestEmbeddingState>(contestEmbeddingStateKey);

export const selectRecentContests = createSelector(
  selectContestEmbeddingState,
  state => state.recentContests
);