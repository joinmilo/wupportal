import { createReducer, on } from '@ngrx/store';
import { Maybe, UserContextEntity } from 'src/schema/schema';
import { AuthorEmbeddingActions } from './author-embedding.actions';

export interface AuthorEmbeddingState {
  recentAuthors?: Maybe<UserContextEntity[]>,
}

export const initialState: AuthorEmbeddingState = { };

export const authorEmbeddingReducer = createReducer(
  initialState,

  on(AuthorEmbeddingActions.setRecentAuthors, (state, action): AuthorEmbeddingState => (
    { ...state, recentAuthors: action.authors }
  )),
);
