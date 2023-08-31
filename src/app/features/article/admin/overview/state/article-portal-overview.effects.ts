import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, map, of, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_ArticleEntity } from 'src/app/core/api/generated/schema';
import { CoreActions } from 'src/app/core/state/actions/core.actions';
import { FeedbackType } from 'src/app/core/typings/feedback';
import { ConfirmDeleteComponent } from 'src/app/shared/widgets/confirm-delete/confirm-delete.component';
import { DeleteArticleGQL } from '../../../api/generated/delete-article.mutation.generated';
import { GetArticlesGQL } from '../../../api/generated/get-articles.query.generated';
import { SaveArticleGQL } from '../../../api/generated/save-article.mutation.generated';
import { ArticleAdminOverviewActions } from './article-admin-overview.actions';
import { selectParams } from './article-portal-overview.selectors';

@Injectable()
export class ArticleAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(
      ArticleAdminOverviewActions.updateParams,
      ArticleAdminOverviewActions.articleDeleted,
      ArticleAdminOverviewActions.articleSponsored,
    ),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getArticlesService.watch({ 
      params,
    }).valueChanges),
    map(response => ArticleAdminOverviewActions.setOverviewData(response.data.getArticles as PageableList_ArticleEntity))
  ));

  sponsorArticle = createEffect(() => this.actions.pipe(
    ofType(ArticleAdminOverviewActions.sponsorArticle),
    switchMap(action => this.saveArticleService.mutate({
      entity: {
        id: action?.article?.id,
        sponsored: !action.article?.sponsored,
      }
    })),
    map(() => ArticleAdminOverviewActions.articleSponsored())
  ));

  articleSponsored = createEffect(() => this.actions.pipe(
    ofType(ArticleAdminOverviewActions.articleSponsored),
    map(() => CoreActions.setFeedback({
      type: FeedbackType.Success,
      labelMessage: 'contentIsHighlighted'
    }))
  ));

  deleteArticle = createEffect(() => this.actions.pipe(
    ofType(ArticleAdminOverviewActions.deleteArticle),
    switchMap(action => this.dialog.open(ConfirmDeleteComponent, { data: action.article?.name })
      .afterClosed().pipe(
        switchMap(confirmed => confirmed
          ? of(action.article)
          : EMPTY
        )
      )
    ),
    switchMap(article => this.deleteArticleService.mutate({
      id: article?.id
    })),
    map(() => ArticleAdminOverviewActions.articleDeleted())
  ));

  articleDeleted = createEffect(() => this.actions.pipe(
    ofType(ArticleAdminOverviewActions.articleDeleted),
    map(() => CoreActions.setFeedback({
      type: FeedbackType.Success,
      labelMessage: 'deletedSuccessfully'
    }))
  ));

  constructor(
    private actions: Actions,
    private dialog: MatDialog,
    private deleteArticleService: DeleteArticleGQL,
    private getArticlesService: GetArticlesGQL,
    private saveArticleService: SaveArticleGQL,
    private store: Store,
  ) {}
}
