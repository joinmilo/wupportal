import { createFeatureSelector, createSelector } from '@ngrx/store';
import { organisationEmbeddingStateKey } from '../constants/organisation-embedding.constants';
import { OrganisationEmbeddingState } from './organisation-embedding.reducer';

export const selectOrganisationEmbeddingState = createFeatureSelector<OrganisationEmbeddingState>(organisationEmbeddingStateKey);

export const selectRecentOrganisations = createSelector(
  selectOrganisationEmbeddingState,
  state => state.recentOrganisations
);