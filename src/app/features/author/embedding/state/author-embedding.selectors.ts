import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authorEmbeddingStateKey } from '../constants/author-embedding.constants';
import { AuthorEmbeddingState } from './author-embedding.reducer';

export const selectAuthorEmbeddingState = createFeatureSelector<AuthorEmbeddingState>(authorEmbeddingStateKey);

export const selectRecentAuthors = createSelector(
  selectAuthorEmbeddingState,
  state => state.recentAuthors
);