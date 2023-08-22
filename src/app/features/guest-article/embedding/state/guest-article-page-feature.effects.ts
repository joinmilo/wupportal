import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ArticleEntity, GetArticlesGQL, QueryOperator } from 'src/schema/schema';
import { GuestArticleEmbeddingActions } from './guest-article-embedding.actions';

@Injectable()
export class GuestArticleEmbeddingEffects {

  getRecentGuestArticles = createEffect(() => this.actions.pipe(
    ofType(GuestArticleEmbeddingActions.getRecentGuestArticles),
    switchMap(() => this.getArticlesService.watch({
      params: {
        dir: 'desc',
        sort: 'modified',
        size: 10,
        expression: {
          entity: {
            path: 'publicAuthor',
            operator: QueryOperator.NotEqual,
            value: null,
          }
        }
      }
     }).valueChanges),
    map(response => GuestArticleEmbeddingActions.setRecentGuestArticles(response.data.getArticles?.result as ArticleEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getArticlesService: GetArticlesGQL,
  ) {}
}
