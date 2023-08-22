import { createFeatureSelector, createSelector } from '@ngrx/store';
import { surveyEmbeddingStateKey } from '../constants/survey-embedding.constants';
import { SurveyEmbeddingState } from './survey-embedding.reducer';

export const selectSurveyEmbeddingState = createFeatureSelector<SurveyEmbeddingState>(surveyEmbeddingStateKey);

export const selectRecentSurveys = createSelector(
  selectSurveyEmbeddingState,
  state => state.recentSurveys
);