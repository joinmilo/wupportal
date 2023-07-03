import { createReducer, on } from '@ngrx/store';
import { ArticleEntity, Maybe } from 'src/schema/schema';
import { PortalGuestArticleActions } from './portal-guest-article.actions';

export interface PortalGuestArticleState {
  savedArticle?: Maybe<ArticleEntity>;
}

export const initialState: PortalGuestArticleState = {};

export const portalGuestArticleReducer = createReducer(
  initialState,

  on(PortalGuestArticleActions.saveArticle, (state, action): PortalGuestArticleState => (
    { ...state, savedArticle: action.entity }
  )),

);
