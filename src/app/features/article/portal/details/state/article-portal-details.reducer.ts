import { createReducer, on } from '@ngrx/store';
import { ArticleCommentEntity, ArticleEntity, Maybe } from 'src/schema/schema';
import { ArticlePortalDetailsActions } from './article-portal-details.actions';

export interface ArticlePortalDetailsState {
  comments?: Maybe<ArticleCommentEntity[]>,
  details?: Maybe<ArticleEntity>,
  savedArticleComment?: Maybe<ArticleCommentEntity>
}

export const initialState: ArticlePortalDetailsState = {
};

export const articlePortalDetailsReducer = createReducer(
  initialState,

  on(
    ArticlePortalDetailsActions.setDetails,
    ArticlePortalDetailsActions.detailsUpdated,
    (state, action): ArticlePortalDetailsState => 
      ({ ...state, details: action.article })
  ),

  on(ArticlePortalDetailsActions.setComments, (state, action): ArticlePortalDetailsState => (
    { ...state, comments: action.comments}
  )),

  on(ArticlePortalDetailsActions.articleCommentSaved, (state, action): ArticlePortalDetailsState => (
    { ...state, savedArticleComment: action.entity }
  )),
);
