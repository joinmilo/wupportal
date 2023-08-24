import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ArticleEntity, FilterSortPaginateInput, QueryOperator } from 'src/app/core/api/generated/schema';
import { GetGuestArticleCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-guest-article-cards.query.generated';
import { GuestArticleEmbeddingActions } from './guest-article-embedding.actions';

@Injectable()
export class GuestArticleEmbeddingEffects {

  getRecentGuestArticles = createEffect(() => this.actions.pipe(
    ofType(GuestArticleEmbeddingActions.getRecentGuestArticles),
    switchMap(() => this.getGuestArticleCardsService.watch({
      params: {
        dir: 'desc',
        sort: 'modified',
        size: 10,
        expression: {
          conjunction: {
            operands: [
              {
                entity: {
                  path: 'publicAuthor',
                  operator: QueryOperator.NotEqual,
                  value: null,
                }
              },
              {
                entity: {
                  path: 'approved',
                  operator: QueryOperator.Equal,
                  value: 'true',
                }
              }
            ]
          }
        }
      } as FilterSortPaginateInput
     }).valueChanges),
    map(response => GuestArticleEmbeddingActions.setRecentGuestArticles(response.data.getArticles?.result as ArticleEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getGuestArticleCardsService: GetGuestArticleCardsGQL,
  ) {}
}
