import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { PageableList_InfoMediaEntity } from 'src/app/core/api/generated/schema';
import { GetInfoMediaCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-info-media-cards.query.generated';
import { PortalMediaOverviewActions } from './portal-media-overview.actions';

@Injectable()
export class PortalMediaOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(PortalMediaOverviewActions.updateParams),
    switchMap((action) => this.infoMediaCardsService.watch({
      params: action.params,
    }).valueChanges),
    map(response => PortalMediaOverviewActions.setOverviewMedia(response.data.getInfoMedia as PageableList_InfoMediaEntity))
  ));

  constructor(
    private actions: Actions,
    private infoMediaCardsService: GetInfoMediaCardsGQL,
  ) {}
}
