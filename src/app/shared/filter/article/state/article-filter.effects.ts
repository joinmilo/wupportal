import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { ArticleCategoryEntity } from 'src/app/core/api/generated/schema';
import { GetArticleCategoriesGQL } from '../api/generated/get-article-categories.query.generated';
import { ArticleFilterActions } from './article-filter.actions';

@Injectable()
export class ArticleFilterEffects {

  getCategories = createEffect(() => this.actions.pipe(
    ofType(ArticleFilterActions.getCategories),
    switchMap(() => this.getCategoriesService.watch().valueChanges),
    map(response => ArticleFilterActions.setCategories(response.data.getArticleCategories?.result as ArticleCategoryEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getCategoriesService: GetArticleCategoriesGQL,
  ) { }
}
