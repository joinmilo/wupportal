import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { debounceTime, map, switchMap, take, tap } from 'rxjs';
import { EventFilterQueryDefinition } from 'src/app/core/typings/filter-params/event-filter-param';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { EventCategoryEntity, EventTargetGroupEntity, GetEventCategoriesGQL, GetEventTargetGroupsGQL } from 'src/schema/schema';
import { EventFilterActions } from './event-filter.actions';

@Injectable()
export class EventFilterEffects {

  ngrxOnInitEffects() {
    return EventFilterActions.init();
  }

  init = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.init),
    switchMap(() => this.activatedRoute.queryParams),
    debounceTime(0), //TODO: race condition activated route and ngrxOnInitEffects
    take(1),
    map(params => EventFilterActions.queryParamsInitialized(params))
  ));

  updateByQueryParams = createEffect(() => this.actions.pipe(
    ofType(
      EventFilterActions.queryParamsInitialized,
      EventFilterActions.browserNavigated
    ),
    map(action => {
      const params: Record<string, unknown> = {};
      Object.values(EventFilterQueryDefinition).forEach((value) => {
        switch (true) {
          case action.params[value] === 'true' || action.params[value] === 'false':
            params[value] = action.params[value] === 'true';
            break;
          default:
            params[value] = action.params[value];
        }
      });
      return EventFilterActions.allUpdated(params);
    })
  ));

  // Normally this should be handled within the components but because of merge
  // this most probably leads to a race condition where not all params are removed.
  clearAll = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.clearAll),
    tap(() => {
      const queryParams: Record<string, null> = {};

      [...Object.values(EventFilterQueryDefinition), ...Object.values(FilterQueryDefinition)]
        .forEach((value) => queryParams[value] = null );

      this.router.navigate([], {
        queryParams,
        queryParamsHandling: 'merge',
    });
  }),
  ), { dispatch: false });

  getCategories = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.getCategories),
    switchMap(() => this.getCategoriesService.watch().valueChanges),
    map(response => EventFilterActions.setCategories(response.data.getEventCategories?.result as EventCategoryEntity[]))
  ));

  getTargetGroups = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.getTargetGroups),
    switchMap(() => this.getTargetGroupsService.watch().valueChanges),
    map(response => EventFilterActions.setTargetGroups(response.data.getEventTargetGroups?.result as EventTargetGroupEntity[]))
  ));

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private getCategoriesService: GetEventCategoriesGQL,
    private getTargetGroupsService: GetEventTargetGroupsGQL,
    private router: Router,
  ) { }
}
