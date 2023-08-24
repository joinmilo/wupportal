import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { PageableList_SurveyEntity } from 'src/app/core/api/generated/schema';
import { GetSurveyCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-survey-cards.query.generated';
import { SurveyAdminOverviewActions } from './survey-admin-overview.actions';
import { selectParams } from './survey-portal-overview.selectors';

@Injectable()
export class SurveyAdminOverviewEffects {

  updateParams = createEffect(() => this.actions.pipe(
    ofType(SurveyAdminOverviewActions.updateParams),
    withLatestFrom(this.store.select(selectParams)),
    switchMap(([, params]) => this.getSurveyCardsService.watch({
      params,
    }).valueChanges),
    map(response => SurveyAdminOverviewActions.setOverviewData(response.data.getSurveys as PageableList_SurveyEntity))
  ));

  constructor(
    private actions: Actions,
    private getSurveyCardsService: GetSurveyCardsGQL,
    private store: Store,
  ) {}
}
