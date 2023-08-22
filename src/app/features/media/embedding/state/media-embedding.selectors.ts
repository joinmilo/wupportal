import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mediaEmbeddingStateKey } from '../constants/media-embedding.constants';
import { MediaEmbeddingState } from './media-embedding.reducer';

export const selectEmbeddingFeatureState = createFeatureSelector<MediaEmbeddingState>(mediaEmbeddingStateKey);

export const selectRecentMedia = createSelector(
  selectEmbeddingFeatureState,
  state => state.recentMedia?.map(infoMedia => infoMedia?.media)
);
