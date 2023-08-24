import { createReducer, on } from '@ngrx/store';
import { Maybe, SurveyEntity } from 'src/app/core/api/generated/schema';
import { SurveyEmbeddingActions } from './survey-embedding.actions';

export interface SurveyEmbeddingState {
  recentSurveys?: Maybe<SurveyEntity[]>,
}

export const initialState: SurveyEmbeddingState = { };

export const surveyEmbeddingReducer = createReducer(
  initialState,

  on(SurveyEmbeddingActions.setRecentSurveys, (state, action): SurveyEmbeddingState => (
    { ...state, recentSurveys: action.surveys }
  )),
);
