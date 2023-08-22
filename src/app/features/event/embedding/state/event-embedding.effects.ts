import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { EventEntity, GetEventsGQL } from 'src/schema/schema';
import { EventEmbeddingActions } from './event-embedding.actions';

@Injectable()
export class EventEmbeddingEffects {

  getRecentEvents = createEffect(() => this.actions.pipe(
    ofType(EventEmbeddingActions.getRecentEvents),
    switchMap(() => this.getEventsService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => EventEmbeddingActions.setRecentEvents(response.data.getEvents?.result as EventEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getEventsService: GetEventsGQL,
  ) {}
}
