import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CommonActions } from 'src/app/portal/common/state/common.actions';
import { EventEntity, GetEventDetailsGQL } from 'src/schema/schema';
import { EventActions } from './event.actions';

@Injectable()
export class EventEffects {

  getEventDetails = createEffect(() => this.actions.pipe(
    ofType(EventActions.getEventDetails),
    switchMap((action) => this.getEventDetailsService.watch({ id: action.slug }).valueChanges),
    map(response => response.data.getEvent?.id
      ? EventActions.setEventDetails(response.data.getEvent as EventEntity)
      : CommonActions.notFound())
  ));

  constructor(
    private actions: Actions,
    private getEventDetailsService: GetEventDetailsGQL,
  ) {}
}
