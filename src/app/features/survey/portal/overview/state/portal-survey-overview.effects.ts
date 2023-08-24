import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_SurveyEntity, SurveyEntity } from 'src/app/core/api/generated/schema';
import { GetSurveyCardGQL } from 'src/app/shared/widgets/card/api/generated/get-survey-card.query.generated';
import { GetSurveyCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-survey-cards.query.generated';
import { PortalSurveyOverviewActions } from './portal-survey-overview.actions';
import { selectParams } from './portal-survey-overview.selectors';

@Injectable()
export class PortalSurveyOverviewEffects { 

  getSponsoredSurvey = createEffect(() => this.actions.pipe(
    ofType(PortalSurveyOverviewActions.getSponsoredSurvey),
    switchMap(() => this.getSurveyCardService.watch({
      entity: {
        sponsored: true
      }
    }).valueChanges),
    map(response => PortalSurveyOverviewActions.setSponsoredSurvey(response.data.getSurvey as SurveyEntity))
  ))

 getSurveys = createEffect(() => this.actions.pipe(
    ofType(PortalSurveyOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getSurveyCardsService.watch({ 
      params,
    }).valueChanges),
    map(response => PortalSurveyOverviewActions.setOverviewData(response.data.getSurveys as PageableList_SurveyEntity))
  ));

  constructor(
    private actions: Actions,
    private getSurveyCardService: GetSurveyCardGQL,
    private getSurveyCardsService: GetSurveyCardsGQL,
    private store: Store,
  ) {}
}