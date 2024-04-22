import { createReducer, on } from '@ngrx/store';
import { ArticleCategoryEntity, Maybe } from 'src/app/core/api/generated/schema';
import { ArticleFilterActions } from './article-filter.actions';

export interface ArticleFilterState {
  categories?: Maybe<ArticleCategoryEntity[]>,
}

export const initialState: ArticleFilterState = { };

export const articleFilterReducer = createReducer(
  initialState,

  on(ArticleFilterActions.setCategories, (state, action): ArticleFilterState => (
    { ...state, categories: action.result }
  )),

);
