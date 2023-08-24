import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { EventEntity, PageableList_EventEntity } from 'src/app/core/api/generated/schema';
import { GetEventCardGQL } from 'src/app/shared/widgets/card/api/generated/get-event-card.query.generated';
import { GetEventCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-event-cards.query.generated';
import { PortalEventOverviewActions } from './portal-event-overview.actions';
import { selectParams } from './portal-event-overview.selectors';

@Injectable()
export class PortalEventOverviewEffects {

  getSponsoredEvent = createEffect(() => this.actions.pipe(
    ofType(PortalEventOverviewActions.getSponsoredEvent),
    switchMap(() => this.getEventCardService.watch({ 
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map(response => PortalEventOverviewActions.setSponsoredEvent(response.data.getEvent as EventEntity))
  ));

  updateParams = createEffect(() => this.actions.pipe(
    ofType(PortalEventOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getEventsService.watch({ 
      params,
    }).valueChanges),
    map(response => PortalEventOverviewActions.setOverviewData(response.data.getEvents as PageableList_EventEntity))
  ));

  constructor(
    private actions: Actions,
    private getEventCardService: GetEventCardGQL,
    private getEventsService: GetEventCardsGQL,
    private store: Store,
  ) {}
}
