import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetOrganisationsGQL, OrganisationEntity } from 'src/schema/schema';
import { OrganisationEmbeddingActions } from './organisation-embedding.actions';

@Injectable()
export class OrganisationEmbeddingEffects {

  getRecentOrganisations = createEffect(() => this.actions.pipe(
    ofType(OrganisationEmbeddingActions.getRecentOrganisations),
    switchMap(() => this.getOrganisationsService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => OrganisationEmbeddingActions.setRecentOrganisations(response.data.getOrganisations?.result as OrganisationEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getOrganisationsService: GetOrganisationsGQL,
  ) {}
}
