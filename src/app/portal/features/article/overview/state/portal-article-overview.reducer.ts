import { createReducer, on } from '@ngrx/store';
import { ArticleEntity, FilterSortPaginateInput, Maybe, PageableList_ArticleEntity } from 'src/schema/schema';
import { PortalArticleOverviewActions } from './portal-article-overview.actions';

export interface PortalArticleOverviewState {
  overviewData?: PageableList_ArticleEntity,
  params: FilterSortPaginateInput,
  sponsoredArticle?: Maybe<ArticleEntity>,
}

export const initialState: PortalArticleOverviewState = {
  params: {}
};

export const portalArticleOverviewReducer = createReducer(
  initialState,

  on(PortalArticleOverviewActions.setSponsoredArticle, (state, action): PortalArticleOverviewState => (
    { ...state, sponsoredArticle: action.article }
  )),
  
  on(PortalArticleOverviewActions.updateParams, (state, action): PortalArticleOverviewState => (
    { ...state, params: Object.assign({ ...state.params } || {}, action.params) }
  )),

  on(PortalArticleOverviewActions.setOverviewData, (state, action): PortalArticleOverviewState => (
    { ...state, overviewData: action.articles }
  )),
);
