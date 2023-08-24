import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { DealEntity, PageableList_DealEntity } from 'src/app/core/api/generated/schema';
import { GetDealCardGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-card.query.generated';
import { GetDealCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-deal-cards.query.generated';
import { PortalDealOverviewActions } from './portal-deal-overview.actions';
import { selectParams } from './portal-deal-overview.selectors';

@Injectable()
export class PortalDealOverviewEffects {

  getSponsoredDeal = createEffect(() => this.actions.pipe(
    ofType(PortalDealOverviewActions.getSponsoredDeal),
    switchMap(() => this.getDealCardService.watch({ 
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map(response => PortalDealOverviewActions.setSponsoredDeal(response.data.getDeal as DealEntity))
  ));

  updateParams = createEffect(() => this.actions.pipe(
    ofType(PortalDealOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getDealCardsService.watch({ 
      params,
    }).valueChanges),
    map(response => PortalDealOverviewActions.setOverviewData(response.data.getDeals as PageableList_DealEntity))
  ));

  constructor(
    private actions: Actions,
    private getDealCardService: GetDealCardGQL,
    private getDealCardsService: GetDealCardsGQL,
    private store: Store,
  ) {}
}
