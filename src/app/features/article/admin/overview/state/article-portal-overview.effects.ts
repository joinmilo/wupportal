import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { GetArticlesGQL, PageableList_ArticleEntity } from 'src/schema/schema';
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
    private getArticlesService: GetArticlesGQL,
    private store: Store,
  ) {}
}
