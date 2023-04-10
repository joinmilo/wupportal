import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { CommonActions } from 'src/app/portal/common/state/common.actions';
import { EventEntity, GetEventGQL, GetEventsGQL } from 'src/schema/schema';
import { EventActions } from './event.actions';

@Injectable()
export class EventEffects {

  getEventDetails = createEffect(() => this.actions.pipe(
    ofType(EventActions.getEventDetails),
    switchMap((action) => this.getEvent.watch({ 
      entity: {
        id: action.slug
      }
    }).valueChanges),
    map(response => response.data.getEvent?.id
      ? EventActions.setEventDetails(response.data.getEvent as EventEntity)
      : CommonActions.notFound())
  ));

  getSponsoredEvent = createEffect(() => this.actions.pipe(
    ofType(EventActions.getSponsoredEvent),
    switchMap(() => this.getEvent.watch({ 
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map(response => EventActions.setSponsoredEvent(response.data.getEvent as EventEntity))
  ));

  setParams = createEffect(() => this.actions.pipe(
    ofType(EventActions.setParams),
    switchMap(action => this.getEvents.watch({ 
      params: action.params,
    }).valueChanges),
    map(response => EventActions.setOverviewData(response.data.getEvents?.result as EventEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getEvent: GetEventGQL,
    private getEvents: GetEventsGQL,
  ) {}
}
