import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetEventFormGQL } from '../../../api/generated/get-event-form.query.generated';
import { EventAdminFormActions } from './event-admin-form.actions';

@Injectable()
export class EventAdminFormEffects {

  getEvent = createEffect(() => this.actions.pipe(
    ofType(EventAdminFormActions.getEvent),
    switchMap(action => this.getEventService.watch({
      entity: { slug: action.slug }
    }).valueChanges),
    map(response => EventAdminFormActions.eventRetrieved(response.data.getEvent))
  ));

  constructor(
    private actions: Actions,
    private getEventService: GetEventFormGQL,
  ) {}
}
