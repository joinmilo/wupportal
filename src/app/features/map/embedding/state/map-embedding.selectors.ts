import { createFeatureSelector, createSelector } from '@ngrx/store';
import { mapEmbeddingStateKey } from '../constants/map-embedding.constants';
import { MapEmbeddingState } from './map-embedding.reducer';

export const selectMapEmbeddingState = createFeatureSelector<MapEmbeddingState>(mapEmbeddingStateKey);

export const selectSponsoredDeal = createSelector(
  selectMapEmbeddingState,
  state => state.sponsoredDeal
);

export const selectSponsoredEvent = createSelector(
  selectMapEmbeddingState,
  state => state.sponsoredEvent
);

export const selectSponsoredOrganisation = createSelector(
  selectMapEmbeddingState,
  state => state.sponsoredOrganisation
);