import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { GetPageGQL, PageEntity } from 'src/schema/schema';
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
