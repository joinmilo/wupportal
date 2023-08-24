import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_ArticleEntity } from 'src/app/core/api/generated/schema';
import { GetArticleCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-article-cards.query.generated';
import { ArticleAdminOverviewActions } from './article-admin-overview.actions';
import { selectParams } from './article-portal-overview.selectors';

@Injectable()
export class ArticleAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(ArticleAdminOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getArticlesService.watch({ 
      params,
    }).valueChanges),
    map(response => ArticleAdminOverviewActions.setOverviewData(response.data.getArticles as PageableList_ArticleEntity))
  ));

  constructor(
    private actions: Actions,
    private getArticlesService: GetArticleCardsGQL,
    private store: Store,
  ) {}
}
