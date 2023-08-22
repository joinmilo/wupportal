import { createFeatureSelector, createSelector } from '@ngrx/store';
import { articlesToCards } from 'src/app/shared/widgets/card/utils/card.utils';
import { guestArticleEmbeddingStateKey } from '../constants/guest-article-embedding.constants';
import { GuestArticleEmbeddingState } from './guest-article-page-feature.reducer';

export const selectGuestArticleEmbeddingState = createFeatureSelector<GuestArticleEmbeddingState>(guestArticleEmbeddingStateKey);

export const selectRecentGuestArticles = createSelector(
  selectGuestArticleEmbeddingState,
  state => state.recentGuestArticles
);

export const selectRecentArticleCards = createSelector(
  selectRecentGuestArticles,
  recentGuestArticles => articlesToCards(recentGuestArticles)
);