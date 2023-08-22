import { createReducer, on } from '@ngrx/store';
import { ArticleEntity, Maybe } from 'src/schema/schema';
import { GuestArticleEmbeddingActions } from './guest-article-embedding.actions';

export interface GuestArticleEmbeddingState {
  recentGuestArticles?: Maybe<ArticleEntity[]>,
}

export const initialState: GuestArticleEmbeddingState = { };

export const articleEmbeddingReducer = createReducer(
  initialState,

  on(GuestArticleEmbeddingActions.setRecentGuestArticles, (state, action): GuestArticleEmbeddingState => (
    { ...state, recentGuestArticles: action.articles }
  )),
);
