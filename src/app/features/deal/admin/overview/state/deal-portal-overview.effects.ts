import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_DealEntity } from 'src/app/core/api/generated/schema';
import { GetDealCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-cards.query.generated';
import { DealAdminOverviewActions } from './deal-admin-overview.actions';
import { selectParams } from './deal-portal-overview.selectors';

@Injectable()
export class DealAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(DealAdminOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getDealCardsService.watch({
      params,
    }).valueChanges),
    map(response => DealAdminOverviewActions.setOverviewData(response.data.getDeals as PageableList_DealEntity))
  ));

  constructor(
    private actions: Actions,
    private getDealCardsService: GetDealCardsGQL,
    private store: Store,
  ) {}
}
