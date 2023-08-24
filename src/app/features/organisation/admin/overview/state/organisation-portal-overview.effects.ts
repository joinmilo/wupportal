import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_OrganisationEntity } from 'src/app/core/api/generated/schema';
import { GetOrganisationCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-organisation-cards.query.generated';
import { OrganisationAdminOverviewActions } from './organisation-admin-overview.actions';
import { selectParams } from './organisation-portal-overview.selectors';

@Injectable()
export class OrganisationAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(OrganisationAdminOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.organisationCardsService.watch({
      params,
    }).valueChanges),
    map(response => OrganisationAdminOverviewActions.setOverviewData(response.data.getOrganisations as PageableList_OrganisationEntity))
  ));

  constructor(
    private actions: Actions,
    private organisationCardsService: GetOrganisationCardsGQL,
    private store: Store,
  ) {}
}
