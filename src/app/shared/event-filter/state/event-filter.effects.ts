import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs';
import { EventCategoryEntity, EventTargetGroupEntity, GetEventCategoriesGQL, GetEventTargetGroupsGQL, GetSuburbsGQL, SuburbEntity } from 'src/schema/schema';
import { EventFilterQueryDefinition } from '../../../core/typings/filter-query-param';
import { EventFilterActions } from './event-filter.actions';

@Injectable()
export class EventFilterEffects {

  updateAll = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.updateAll),
    map(action => {
      const params: Record<string, unknown> = {};
      Object.values(EventFilterQueryDefinition).forEach((value) => {
        switch (true) {
          case action.queryParams[value] === 'true' || action.queryParams[value] === 'false':
            params[value] = action.queryParams[value] === 'true';
            break;
          default:
            params[value] = action.queryParams[value];
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
      const queryParams: Record<string, undefined> = {};

      Object.values(EventFilterQueryDefinition).forEach((value) =>
        queryParams[value] = undefined
      );

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
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

  getSuburbs = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.getSuburbs),
    switchMap(() => this.getSuburbsService.watch().valueChanges),
    map(response => EventFilterActions.setSuburbs(response.data.getSuburbs?.result as SuburbEntity[]))
  ));

  constructor(
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private getCategoriesService: GetEventCategoriesGQL,
    private getSuburbsService: GetSuburbsGQL,
    private getTargetGroupsService: GetEventTargetGroupsGQL,
    private router: Router,
  ) { }
}
