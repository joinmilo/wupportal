import { createFeatureSelector } from '@ngrx/store';
import * as fromCommon from './common.reducer';

export const selectCommonState = createFeatureSelector<fromCommon.State>(
  fromCommon.commonFeatureKey
);
