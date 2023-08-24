import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { DealEntity } from 'src/app/core/api/generated/schema';
import { PortalActions } from 'src/app/portal/state/portal.actions';
import { GetDealDetailsGQL } from '../../../api/generated/get-deal-details.query.generated';
import { PortalDealDetailsActions } from './portal-deal-details.actions';

@Injectable()
export class PortalDealDetailsEffects {

  getDetails = createEffect(() => this.actions.pipe(
    ofType(PortalDealDetailsActions.getDetails),
    switchMap((action) => this.getDealDetailsService.watch({
      entity: {
        slug: action.slug
      }
    }).valueChanges),
    map(response => response.data.getDeal?.id
      ? PortalDealDetailsActions.setDetails(response.data.getDeal as DealEntity)
      : PortalActions.notFound())
  ));


  constructor(
    private actions: Actions,
    private getDealDetailsService: GetDealDetailsGQL,
  ) { }
}
