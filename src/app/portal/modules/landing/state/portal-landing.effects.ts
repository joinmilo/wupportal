import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { PageEntity } from 'src/app/core/api/generated/schema';
import { GetPageGQL } from 'src/app/portal/api/generated/get-page.query.generated';
import { PortalLandingActions } from './portal-landing.actions';

@Injectable()
export class PortalLandingEffects {

  getLandingPage = createEffect(() => this.actions.pipe(
    ofType(PortalLandingActions.getLandingPage),
    switchMap(() => this.getPageService.watch({ isLanding: true }).valueChanges),
    map(response => PortalLandingActions.setLandingPage(response.data.getPage as PageEntity))
  ));

  constructor(
    private actions: Actions,
    private getPageService: GetPageGQL,
  ) {}
}
