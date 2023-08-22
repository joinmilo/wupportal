import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ArticleEntity, GetArticlesGQL } from 'src/schema/schema';
import { ArticleEmbeddngActions } from './article-embedding.actions';

@Injectable()
export class ArticleEmbeddingEffects {

  getRecentArticles = createEffect(() => this.actions.pipe(
    ofType(ArticleEmbeddngActions.getRecentArticles),
    switchMap(() => this.getArticlesService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => ArticleEmbeddngActions.setRecentArticles(response.data.getArticles?.result as ArticleEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getArticlesService: GetArticlesGQL,
  ) {}
}
