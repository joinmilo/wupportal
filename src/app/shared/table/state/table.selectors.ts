import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tableStateKey } from '../constants/table.constants';
import { TableState } from './table.reducer';

export const selectTableState = createFeatureSelector<TableState>(tableStateKey);

export const selectTableParams = createSelector(
  selectTableState,
  state => state.params
);