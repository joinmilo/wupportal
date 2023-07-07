import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';
import { ArticleEntity, SaveArticleGQL } from 'src/schema/schema';
import { PortalGuestArticleActions } from './portal-guest-article.actions';

@Injectable()
export class PortalGuestArticleEffects {

  saveReport = createEffect(() => this.actions.pipe(
    ofType(PortalGuestArticleActions.saveArticle),
    switchMap((action) => this.saveArticleService.mutate({
      entity: action.entity
    })),
    map(response => PortalGuestArticleActions.articleSaved(response.data?.saveArticle as ArticleEntity))
  ));

  articleSaved = createEffect(() => this.actions.pipe(
    ofType(PortalGuestArticleActions.articleSaved),
    map(() => CoreActions.setFeedback({
      type: FeedbackType.Success,
      labelMessage: 'articleReceived'
    }))
  ));

  constructor(
    private actions: Actions,
    private saveArticleService: SaveArticleGQL,
  ) { }
}
