import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { DealEntity, GetDealsGQL } from 'src/schema/schema';
import { DealEmbeddingActions } from './deal-embedding.actions';

@Injectable()
export class DealEmbeddingEffects {

  getRecentDeals = createEffect(() => this.actions.pipe(
    ofType(DealEmbeddingActions.getRecentDeals),
    switchMap(() => this.getDealsService.watch({
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
    private getDealsService: GetDealsGQL,
  ) {}
}
