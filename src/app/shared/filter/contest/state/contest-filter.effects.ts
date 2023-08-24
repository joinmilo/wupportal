import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, take, tap } from 'rxjs';
import { ContestTypeEntity } from 'src/app/core/api/generated/schema';
import { ContestFilterQueryDefinition } from 'src/app/core/typings/filter-params/contest-filter-param';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { GetContestTypesGQL } from '../api/generated/get-contest-types.query.generated';
import { ContestFilterActions } from './contest-filter.actions';

@Injectable()
export class ContestFilterEffects {

  init = createEffect(() => this.actions.pipe(
    ofType(ContestFilterActions.init),
    switchMap(() => this.activatedRoute.queryParams),
    debounceTime(0), //TODO: race condition activated route and ngrxOnInitEffects
    take(1),
    map(params => ContestFilterActions.queryParamsInitialized(params))
  ));

  updateByQueryParams = createEffect(() => this.actions.pipe(
    ofType(
      ContestFilterActions.queryParamsInitialized,
      ContestFilterActions.browserNavigated
    ),
    map(action => {
      const params: Record<string, unknown> = {};
      Object.values(ContestFilterQueryDefinition).forEach((value) => {
        switch (true) {
          case action.params[value] === 'true' || action.params[value] === 'false':
            params[value] = action.params[value] === 'true';
            break;
          default:
            params[value] = action.params[value];
        }
      });
      return ContestFilterActions.allUpdated(params);
    })
  ));

  // Normally this should be handled within the components but because of merge
  // this most probably leads to a race condition where not all params are removed.
  clearAll = createEffect(() => this.actions.pipe(
    ofType(ContestFilterActions.clearAll),
    tap(() => {
      const queryParams: Record<string, null> = {};

      [...Object.values(ContestFilterQueryDefinition), ...Object.values(FilterQueryDefinition)]
        .forEach((value) => queryParams[value] = null);

      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
      });
    }),
  ), { dispatch: false });

  getTypes = createEffect(() => this.actions.pipe(
    ofType(ContestFilterActions.getTypes),
    switchMap(() => this.getTypesService.watch().valueChanges),
    map(response => ContestFilterActions.setTypes(response.data.getContestTypes?.result as ContestTypeEntity[]))
  ));

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private getTypesService: GetContestTypesGQL,
    private router: Router,
  ) { }
}
