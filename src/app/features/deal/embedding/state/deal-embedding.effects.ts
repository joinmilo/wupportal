import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { DealEntity } from 'src/app/core/api/generated/schema';
import { GetDealCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-cards.query.generated';
import { DealEmbeddingActions } from './deal-embedding.actions';

@Injectable()
export class DealEmbeddingEffects {

  getRecentDeals = createEffect(() => this.actions.pipe(
    ofType(DealEmbeddingActions.getRecentDeals),
    switchMap(() => this.getDealCardsService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => DealEmbeddingActions.setRecentDeals(response.data.getDeals?.result as DealEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getDealCardsService: GetDealCardsGQL,
  ) {}
}
