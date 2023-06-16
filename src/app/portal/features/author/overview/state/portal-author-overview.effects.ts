import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { translatorKey } from 'src/app/core/constants/core.constants';
import { GetUserContextsGQL, PageableList_UserContextEntity, QueryOperator } from 'src/schema/schema';
import { PortalAuthorOverviewActions } from './portal-author-overview.actions';

@Injectable()
export class PortalAuthorOverviewEffects {

  getAuthors = createEffect(() => this.actions.pipe(
    ofType(PortalAuthorOverviewActions.updateParams),
    switchMap(action => this.getAuthorsService.watch({ 
      params: {
        ...action.params, expression: {
          entity: {
            operator: QueryOperator.NotEqual,
            path: 'user.roles.key',
            value: translatorKey
          }
        },
      }
    }).valueChanges),
    map(response => PortalAuthorOverviewActions.setOverviewData(response.data.getUserContexts as PageableList_UserContextEntity))
  ));
  
  constructor(
    private actions: Actions,
    private getAuthorsService: GetUserContextsGQL,
  ) {}
}
