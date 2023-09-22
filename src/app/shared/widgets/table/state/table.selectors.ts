/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { tableStateKey } from '../constants/table.constants';
import { TableState } from './table.reducer';

export const selectTableState = createFeatureSelector<TableState<any>>(tableStateKey);

export const selectActions = createSelector(
  selectTableState,
  state => state.actions
);

export const selectClickable = createSelector(
  selectTableState,
  state => state.clickable
);

export const selectClickedRow = createSelector(
  selectTableState,
  state => state.clickedRow
);

export const selectColumns = createSelector(
  selectTableState,
  state => state.columns
);

export const selectData = createSelector(
  selectTableState,
  state => state.data
);

export const selectDisplayColumns = createSelector(
  selectColumns,
  selectActions,
  (columns, actions) => [
    ...columns?.map(c => c.field) || [],
    ...(actions ? ['actions'] : [])
  ]
);

export const selectEntity = createSelector(
  selectTableState,
  state => state.entity
);

export const selectInlineEditAction = createSelector(
  selectTableState,
  state => state.inlineEditAction
);

export const selectInlineEditActive = createSelector(
  selectTableState,
  state => state.inlineEditActive
);

export const selectInlineEditRow = createSelector(
  selectTableState,
  state => state.inlineEditRow
);

export const selectParams = createSelector(
  selectTableState,
  state => state.params
);

export const selectQueryParams = createSelector(
  selectTableState,
  state => state.queryParams
);
