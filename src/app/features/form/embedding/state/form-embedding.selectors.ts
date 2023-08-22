import { createFeatureSelector, createSelector } from '@ngrx/store';
import { formEmbeddingStateKey } from '../constants/form-embedding.constants';
import { FormEmbeddingState } from './form-embedding.reducer';

export const selectFormEmbeddingState = createFeatureSelector<FormEmbeddingState>(formEmbeddingStateKey);

export const selectRecentForms = createSelector(
  selectFormEmbeddingState,
  state => state.recentForms
);