import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { DealEntity, EventEntity, GetDealGQL, GetEventGQL, GetOrganisationGQL, OrganisationEntity } from 'src/schema/schema';
import { MapEmbeddingActions } from './map-embedding.actions';

@Injectable()
export class MapEmbeddingEffects {

  getSponsoredDeal = createEffect(() => this.actions.pipe(
    ofType(MapEmbeddingActions.getSponsoredDeal),
    switchMap(() => this.getDeal.watch({
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map((response) => MapEmbeddingActions.setSponsoredDeal(
      response.data.getDeal as DealEntity
    ))
  ));

  getSponsoredEvent = createEffect(() => this.actions.pipe(
    ofType(MapEmbeddingActions.getSponsoredEvent),
    switchMap(() => this.getEvent.watch({
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map((response) => MapEmbeddingActions.setSponsoredEvent(
      response.data.getEvent as EventEntity
    ))
  ));

  getSponsoredOrganisation = createEffect(() => this.actions.pipe(
    ofType(MapEmbeddingActions.getSponsoredOrganisation),
    switchMap(() => this.getOrganisation.watch({
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map((response) => MapEmbeddingActions.setSponsoredOrganisation(
      response.data.getOrganisation as OrganisationEntity
    ))
  ));  
  
  constructor(
    private actions: Actions,
    private getEvent: GetEventGQL,
    private getDeal: GetDealGQL,
    private getOrganisation: GetOrganisationGQL,
  ) {}
}
