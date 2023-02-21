import { createFeatureSelector } from '@ngrx/store';
import { commonFeatureKey } from '../constants/common.constants';
import { CommonState } from './common.reducer';

export const selectCommonState = createFeatureSelector<CommonState>(commonFeatureKey);
