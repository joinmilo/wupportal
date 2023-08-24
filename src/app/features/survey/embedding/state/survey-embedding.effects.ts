import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';
import { SurveyEntity } from 'src/app/core/api/generated/schema';
import { GetSurveyCardsGQL } from 'src/app/shared/widgets/card/api/generated/get-survey-cards.query.generated';
import { SurveyEmbeddingActions } from './survey-embedding.actions';

@Injectable()
export class SurveyEmbeddingEffects {

  getRecentSurveys = createEffect(() => this.actions.pipe(
    ofType(SurveyEmbeddingActions.getRecentSurveys),
    switchMap(() => this.getSurveyCardsService.watch({
      params: {
        sort: 'modified',
        dir: 'desc',
        size: 10,
      }
     }).valueChanges),
    map(response => SurveyEmbeddingActions.setRecentSurveys(response.data.getSurveys?.result as SurveyEntity[]))
  ));

  constructor(
    private actions: Actions,
    private getSurveyCardsService: GetSurveyCardsGQL,
  ) {}
}
