import { createReducer, on } from '@ngrx/store';
import { InfoMediaEntity, Maybe } from 'src/app/core/api/generated/schema';
import { MediaEmbeddingActions } from './media-embedding.actions';

export interface MediaEmbeddingState {
  recentMedia?: Maybe<InfoMediaEntity[]>,
}

export const initialState: MediaEmbeddingState = { };

export const mediaEmbeddingReducer = createReducer(
  initialState,

  on(MediaEmbeddingActions.setRecentMedia, (state, action): MediaEmbeddingState => (
    { ...state, recentMedia: action.media }
  )),
);
