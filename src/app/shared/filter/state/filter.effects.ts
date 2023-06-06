import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { EventTargetGroupEntity, GetEventTargetGroupsGQL } from 'src/schema/schema';
import { FilterActions } from './filter.actions';

@Injectable()
export class FilterEffects {

  getTargetGroups = createEffect(() => this.actions.pipe(
    ofType(FilterActions.getTargetGroups),
    switchMap(() => this.getTargetGroupsService.watch().valueChanges),
    map(response => FilterActions.setTargetGroups(response.data.getEventTargetGroups?.result as EventTargetGroupEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getTargetGroupsService: GetEventTargetGroupsGQL,
  ) {}
}
