import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { UserContextEntity } from 'src/app/core/api/generated/schema';
import { PortalActions } from 'src/app/portal/state/portal.actions';
import { GetAuthorDetailsGQL } from '../../../api/generated/get-author-details.generated';
import { PortalAuthorDetailsActions } from './portal-author-details.actions';
@Injectable()
export class AuthorDetailsEffects {

  getDetails = createEffect(() => this.actions.pipe(
    ofType(PortalAuthorDetailsActions.getDetails),
    switchMap((action) => this.getAuthorDetails.watch({ 
      entity: {
        slug: action.slug
      }
    }).valueChanges),
    map(response => response.data.getUserContext?.id
      ? PortalAuthorDetailsActions.setDetails(response.data.getUserContext as UserContextEntity)
      : PortalActions.notFound())
  ));

  constructor(
    private actions: Actions,
    private getAuthorDetails: GetAuthorDetailsGQL, 
  ) {}
}
