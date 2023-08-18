import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { GetOrganisationGQL, GetOrganisationsGQL, OrganisationEntity, PageableList_OrganisationEntity } from 'src/schema/schema';
import { PortalOrganisationOverviewActions } from './portal-organisation-overview.actions';
import { selectParams } from './portal-organisation-overview.selectors';

@Injectable()
export class PortalOrganisationOverviewEffects {

  getSponsoredOrganisation = createEffect(() => this.actions.pipe(
    ofType(PortalOrganisationOverviewActions.getSponsoredOrganisation),
    switchMap(() => this.getOrganisation.watch({ 
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map(response => PortalOrganisationOverviewActions.setSponsoredOrganisation(response.data.getOrganisation as OrganisationEntity))
  ));

  updateParams = createEffect(() => this.actions.pipe(
    ofType(PortalOrganisationOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getOrganisations.watch({ 
      params,
    }).valueChanges),
    map(response => PortalOrganisationOverviewActions.setOverviewData(response.data.getOrganisations as PageableList_OrganisationEntity))
  ));

  constructor(
    private actions: Actions,
    private getOrganisation: GetOrganisationGQL,
    private getOrganisations: GetOrganisationsGQL,
    private store: Store,
  ) {}
}
