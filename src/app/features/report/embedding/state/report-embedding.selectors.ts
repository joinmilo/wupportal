import { createFeatureSelector, createSelector } from '@ngrx/store';
import { reportEmbeddingStateKey } from '../constants/report-embedding.constant';
import { ReportEmbeddingState } from './report-embedding.reducer';

export const selectReportEmbeddingState = createFeatureSelector<ReportEmbeddingState>(reportEmbeddingStateKey);

export const selectReportTypes = createSelector(
  selectReportEmbeddingState,
  state => state.types
);

export const selectSavedReport = createSelector(
  selectReportEmbeddingState,
  state => state.savedReport
);