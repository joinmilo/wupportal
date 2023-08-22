import { createFeatureSelector, createSelector } from '@ngrx/store';
import { articlesToCards } from 'src/app/shared/widgets/card/utils/card.utils';
import { articleEmbeddingStateKey } from '../constants/article-embedding.constants';
import { ArticleEmbeddingState } from './article-embedding.reducer';

export const selectArticleEmbeddingState = createFeatureSelector<ArticleEmbeddingState>(articleEmbeddingStateKey);

export const selectRecentArticles = createSelector(
  selectArticleEmbeddingState,
  state => state.recentArticles
);

export const selectRecentArticleCards = createSelector(
  selectRecentArticles,
  recentArticles => articlesToCards(recentArticles)
);