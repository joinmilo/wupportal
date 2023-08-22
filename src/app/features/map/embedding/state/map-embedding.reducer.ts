import { createReducer, on } from '@ngrx/store';
import { DealEntity, EventEntity, Maybe, OrganisationEntity } from 'src/schema/schema';
import { MapEmbeddingActions } from './map-embedding.actions';

export interface MapEmbeddingState {
  sponsoredDeal?: Maybe<DealEntity>,
  sponsoredEvent?: Maybe<EventEntity>,
  sponsoredOrganisation?: Maybe<OrganisationEntity>,
}

export const initialState: MapEmbeddingState = { };

export const mapEmbeddingReducer = createReducer(
  initialState,

  on(MapEmbeddingActions.setSponsoredEvent, (state, action): MapEmbeddingState => (
    { ...state, sponsoredEvent: action.event }
  )),

  on(MapEmbeddingActions.setSponsoredDeal, (state, action): MapEmbeddingState => (
    { ...state, sponsoredDeal: action.deal }
  )),

  on(MapEmbeddingActions.setSponsoredOrganisation, (state, action): MapEmbeddingState => (
    { ...state, sponsoredOrganisation: action.organisation }
  )),

);
