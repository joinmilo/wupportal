import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, take, tap } from 'rxjs';
import { ArticleCategoryEntity } from 'src/app/core/api/generated/schema';
import { ArticleFilterQueryDefinition } from 'src/app/core/typings/filter-params/article-filter-param';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { GetArticleCategoriesGQL } from '../api/generated/get-article-categories.query.generated';
import { ArticleFilterActions } from './article-filter.actions';

@Injectable()
export class ArticleFilterEffects {

  init = createEffect(() => this.actions.pipe(
    ofType(ArticleFilterActions.init),
    switchMap(() => this.activatedRoute.queryParams),
    debounceTime(0), //TODO: race condition activated route and ngrxOnInitEffects
    take(1),
    map(params => ArticleFilterActions.queryParamsInitialized(params))
  ));

  updateByQueryParams = createEffect(() => this.actions.pipe(
    ofType(
      ArticleFilterActions.queryParamsInitialized,
      ArticleFilterActions.browserNavigated
    ),
    map(action => {
      const params: Record<string, unknown> = {};
      Object.values(ArticleFilterQueryDefinition).forEach((value) => {
        switch (true) {
          case action.params[value] === 'true' || action.params[value] === 'false':
            params[value] = action.params[value] === 'true';
            break;
          default:
            params[value] = action.params[value];
        }
      });
      return ArticleFilterActions.allUpdated(params);
    })
  ));

  // Normally this should be handled within the components but because of merge
  // this most probably leads to a race condition where not all params are removed.
  clearAll = createEffect(() => this.actions.pipe(
    ofType(ArticleFilterActions.clearAll),
    tap(() => {
      const queryParams: Record<string, null> = {};

      [...Object.values(ArticleFilterQueryDefinition), ...Object.values(FilterQueryDefinition)]
        .forEach((value) => queryParams[value] = null );

      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
    });
  }),
  ), { dispatch: false });

  getCategories = createEffect(() => this.actions.pipe(
    ofType(ArticleFilterActions.getCategories),
    switchMap(() => this.getCategoriesService.watch().valueChanges),
    map(response => ArticleFilterActions.setCategories(response.data.getArticleCategories?.result as ArticleCategoryEntity[]))
  ));

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private getCategoriesService: GetArticleCategoriesGQL,
    private router: Router,
  ) { }
}
