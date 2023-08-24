import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, take, tap } from 'rxjs';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { OrganisationFilterQueryDefinition } from 'src/app/core/typings/filter-params/organisation-filter-param';
import { OrganisationFilterActions } from './organisation-filter.actions';

@Injectable()
export class OrganisationFilterEffects {

  init = createEffect(() => this.actions.pipe(
    ofType(OrganisationFilterActions.init),
    switchMap(() => this.activatedRoute.queryParams),
    debounceTime(0), //TODO: race condition activated route and ngrxOnInitEffects
    take(1),
    map(params => OrganisationFilterActions.queryParamsInitialized(params))
  ));

  updateByQueryParams = createEffect(() => this.actions.pipe(
    ofType(
      OrganisationFilterActions.queryParamsInitialized,
      OrganisationFilterActions.browserNavigated
    ),
    map(action => {
      const params: Record<string, unknown> = {};
      Object.values(OrganisationFilterQueryDefinition).forEach((value) => {
        switch (true) {
          case action.params[value] === 'true' || action.params[value] === 'false':
            params[value] = action.params[value] === 'true';
            break;
          default:
            params[value] = action.params[value];
        }
      });
      return OrganisationFilterActions.allUpdated(params);
    })
  ));

  // Normally this should be handled within the components but because of merge
  // this most probably leads to a race condition where not all params are removed.
  clearAll = createEffect(() => this.actions.pipe(
    ofType(OrganisationFilterActions.clearAll),
    tap(() => {
      const queryParams: Record<string, null> = {};

      [...Object.values(OrganisationFilterQueryDefinition), ...Object.values(FilterQueryDefinition)]
        .forEach((value) => queryParams[value] = null);

      this.router.navigate([], {
        
        queryParams,
        queryParamsHandling: 'merge',
      });
    }),
  ), { dispatch: false });

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }
}
