import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, tap, withLatestFrom } from 'rxjs';
import { EventEntity, GetEventGQL, GetEventsGQL, PageableList_EventEntity } from 'src/schema/schema';
import { PortalEventOverviewActions } from './portal-event-overview.actions';
import { selectParams } from './portal-event-overview.selectors';

@Injectable()
export class PortalEventOverviewEffects {

  getSponsoredEvent = createEffect(() => this.actions.pipe(
    ofType(PortalEventOverviewActions.getSponsoredEvent),
    switchMap(() => this.getEvent.watch({ 
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map(response => PortalEventOverviewActions.setSponsoredEvent(response.data.getEvent as EventEntity))
  ));

  updateParams = createEffect(() => this.actions.pipe(
    ofType(PortalEventOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    map(([action, currentParams]) => Object.assign({ ...currentParams } || {}, action.params)),
    map(params => PortalEventOverviewActions.paramsUpdated(params))
  ));

  paramsUpdated = createEffect(() => this.actions.pipe(
    ofType(PortalEventOverviewActions.paramsUpdated),
    tap(test => console.log(test)),
    switchMap(action => this.getEvents.watch({ 
      params: action.params,
    }).valueChanges),
    map(response => PortalEventOverviewActions.setOverviewData(response.data.getEvents as PageableList_EventEntity))
  ));

  constructor(
    private actions: Actions,
    private getEvent: GetEventGQL,
    private getEvents: GetEventsGQL,
    private store: Store,
  ) {}
}
