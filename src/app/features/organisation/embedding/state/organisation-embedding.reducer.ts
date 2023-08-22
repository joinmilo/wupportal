import { createReducer, on } from '@ngrx/store';
import { Maybe, OrganisationEntity } from 'src/schema/schema';
import { OrganisationEmbeddingActions } from './organisation-embedding.actions';

export interface OrganisationEmbeddingState {
  recentOrganisations?: Maybe<OrganisationEntity[]>,
}

export const initialState: OrganisationEmbeddingState = { };

export const organisationEmbeddingReducer = createReducer(
  initialState,

  on(OrganisationEmbeddingActions.setRecentOrganisations, (state, action): OrganisationEmbeddingState => (
    { ...state, recentOrganisations: action.organisations }
  )),
);
