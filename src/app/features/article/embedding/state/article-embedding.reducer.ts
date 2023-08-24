import { createReducer, on } from '@ngrx/store';
import { ArticleEntity, Maybe } from 'src/app/core/api/generated/schema';
import { ArticleEmbeddngActions } from './article-embedding.actions';

export interface ArticleEmbeddingState {
  recentArticles?: Maybe<ArticleEntity[]>,
}

export const initialState: ArticleEmbeddingState = { };

export const articleEmbeddingReducer = createReducer(
  initialState,

  on(ArticleEmbeddngActions.setRecentArticles, (state, action): ArticleEmbeddingState => (
    { ...state, recentArticles: action.articles }
  )),
);
