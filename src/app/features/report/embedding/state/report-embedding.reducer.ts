import { createReducer, on } from '@ngrx/store';
import { Maybe, ReportEntity, ReportTypeEntity } from 'src/schema/schema';
import { ReportEmbeddingActions } from './report-embedding.actions';

export interface ReportEmbeddingState {
  types?: Maybe<ReportTypeEntity[]>,
  savedReport?: Maybe<ReportEntity>;
}

export const initialState: ReportEmbeddingState = { };

export const reportEmbeddingReducer = createReducer(
  initialState,

  on(ReportEmbeddingActions.reportSaved, (state, action): ReportEmbeddingState => (
    { ...state, savedReport: action.entity }
  )),

  on(ReportEmbeddingActions.setCurrentTypes, (state, action): ReportEmbeddingState => (
    { ...state, types: action.types }
  )),

  on(ReportEmbeddingActions.reset, (state): ReportEmbeddingState => (
    { ...state, savedReport: undefined }
  )),

);
