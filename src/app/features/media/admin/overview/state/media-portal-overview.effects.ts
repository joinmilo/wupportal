import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_InfoMediaEntity } from 'src/app/core/api/generated/schema';
import { GetInfoMediaCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-info-media-cards.query.generated';
import { MediaAdminOverviewActions } from './media-admin-overview.actions';
import { selectParams } from './media-portal-overview.selectors';

@Injectable()
export class MediaAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(MediaAdminOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getInfoMediaCards.watch({
      params,
    }).valueChanges),
    map(response => MediaAdminOverviewActions.setOverviewData(response.data.getInfoMedia as PageableList_InfoMediaEntity))
  ));

  constructor(
    private actions: Actions,
    private getInfoMediaCards: GetInfoMediaCardsGQL,
    private store: Store,
  ) {}
}
