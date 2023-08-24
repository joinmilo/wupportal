import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { DealEntity, EventEntity, OrganisationEntity } from 'src/app/core/api/generated/schema';
import { GetDealCardGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-card.query.generated';
import { GetEventCardGQL } from 'src/app/shared/widgets/card/api/generated/get-event-card.query.generated';
import { GetOrganisationCardGQL } from 'src/app/shared/widgets/card/api/generated/get-organisation-card.query.generated';
import { MapEmbeddingActions } from './map-embedding.actions';

@Injectable()
export class MapEmbeddingEffects {

  getSponsoredDeal = createEffect(() => this.actions.pipe(
    ofType(MapEmbeddingActions.getSponsoredDeal),
    switchMap(() => this.getDealCardService.watch({
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
    switchMap(() => this.getEventCardService.watch({
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
    switchMap(() => this.getOrganisationCardService.watch({
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
    private getEventCardService: GetEventCardGQL,
    private getDealCardService: GetDealCardGQL,
    private getOrganisationCardService: GetOrganisationCardGQL,
  ) {}
}
