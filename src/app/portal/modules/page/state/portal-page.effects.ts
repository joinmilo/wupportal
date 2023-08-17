import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetPageGQL, PageEntity } from 'src/schema/schema';
import { PortalActions } from '../../../state/portal.actions';
import { PortalPageActions } from './portal-page.actions';

@Injectable()
export class PortalPageEffects {

  getPage = createEffect(() => this.actions.pipe(
    ofType(PortalPageActions.getPage),
    switchMap((action) => this.getPageService.watch({ slug: action.slug }).valueChanges),
    map(response => response.data.getPage?.id
      ? PortalPageActions.setPage(response.data.getPage as PageEntity)
      : PortalActions.notFound())
  ));

  constructor(
    private actions: Actions,
    private getPageService: GetPageGQL,
  ) {}
}
