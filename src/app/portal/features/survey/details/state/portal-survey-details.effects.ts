import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { PortalActions } from 'src/app/portal/state/portal.actions';
import { GetSurveyGQL, SurveyEntity } from 'src/schema/schema';
import { PortalSurveyDetailsActions } from './portal-survey-details.actions';

@Injectable()
export class PortalSurveyDetailsEffects {

  getDetails = createEffect(() => this.actions.pipe(
    ofType(PortalSurveyDetailsActions.getDetails),
    switchMap((action) => this.getSurveyService.watch({
      entity: {
        slug: action.slug
      }
    }).valueChanges),
    map(response => response.data.getSurvey?.id
      ? PortalSurveyDetailsActions.setDetails(response.data.getSurvey as SurveyEntity)
      : PortalActions.notFound())
  ));

  constructor(
    private actions: Actions,
    private getSurveyService: GetSurveyGQL,
  ) { }
}
