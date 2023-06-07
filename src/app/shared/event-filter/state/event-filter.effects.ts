import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, take, tap } from 'rxjs';
import { EventCategoryEntity, EventTargetGroupEntity, GetEventCategoriesGQL, GetEventTargetGroupsGQL } from 'src/schema/schema';
import { EventFilterDefinition } from '../constants/event-filter.constants';
import { EventFilterQueryParams } from '../typings/event-filter-query-param';
import { EventFilterActions } from './event-filter.actions';

@Injectable()
export class EventFilterEffects {

  init = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.init),
    switchMap(() => this.activatedRoute.queryParams),
    take(1),
    map((params: EventFilterQueryParams) => EventFilterActions.initialized({
      [EventFilterDefinition.categories]: params[EventFilterDefinition.categories],
      [EventFilterDefinition.currentOnly]: typeof params[EventFilterDefinition.currentOnly] === 'string'
        ? params[EventFilterDefinition.currentOnly] === 'true'
        : false,
      [EventFilterDefinition.freeOnly]: typeof params[EventFilterDefinition.freeOnly] === 'string'
        ? params[EventFilterDefinition.freeOnly] === 'true'
        : false,
      [EventFilterDefinition.suburbs]: params[EventFilterDefinition.suburbs],
      [EventFilterDefinition.targetGroups]: params[EventFilterDefinition.targetGroups],
    }))
  ));

  // Normally this should be handled within the components but because of merge
  // this most probably leads to a race condition where not all params are removed.
  clearAll = createEffect(() => this.actions.pipe(
    ofType(EventFilterActions.clearAll),
    tap(() => this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        [EventFilterDefinition.categories]: undefined,
        [EventFilterDefinition.currentOnly]: undefined,
        [EventFilterDefinition.freeOnly]: undefined,
        [EventFilterDefinition.suburbs]: undefined,
        [EventFilterDefinition.targetGroups]: undefined,
      },
      queryParamsHandling: 'merge',
    })),
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
