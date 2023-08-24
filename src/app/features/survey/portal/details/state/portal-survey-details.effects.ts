import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { SurveyEntity } from 'src/app/core/api/generated/schema';
import { PortalActions } from 'src/app/portal/state/portal.actions';
import { GetSurveyCardGQL } from 'src/app/shared/widgets/card/api/generated/get-survey-card.query.generated';
import { PortalSurveyDetailsActions } from './portal-survey-details.actions';

@Injectable()
export class PortalSurveyDetailsEffects {

  getDetails = createEffect(() => this.actions.pipe(
    ofType(PortalSurveyDetailsActions.getDetails),
    switchMap((action) => this.getSurveyCardService.watch({
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
    private getSurveyCardService: GetSurveyCardGQL,
  ) { }
}
