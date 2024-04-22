import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { EventCategoryEntity, EventTargetGroupEntity } from 'src/app/core/api/generated/schema';
import { GetEventCategoriesGQL } from '../api/generated/get-event-categories.query.generated';
import { GetEventTargetGroupsGQL } from '../api/generated/get-event-targetgroups.query.generated';
import { EventFilterActions } from './event-filter.actions';

@Injectable()
export class EventFilterEffects {

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
    private getCategoriesService: GetEventCategoriesGQL,
    private getTargetGroupsService: GetEventTargetGroupsGQL,
  ) { }
}
