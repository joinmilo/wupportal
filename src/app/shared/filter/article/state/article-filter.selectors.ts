import { createFeatureSelector, createSelector } from '@ngrx/store';
import { articleFilterStateKey } from '../constants/event-filter.constants';
import { ArticleFilterState } from './article-filter.reducer';

export const selectArticleFilterState = createFeatureSelector<ArticleFilterState>(articleFilterStateKey);

export const selectCategories = createSelector(
  selectArticleFilterState,
  state => state.categories
);