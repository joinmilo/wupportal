import { createReducer, on } from '@ngrx/store';
import { FilterSortPaginateInput } from 'src/schema/schema';
import { TableActions } from './table.actions';

export interface TableState {
  params?: FilterSortPaginateInput,
}

export const initialState: TableState = { };

export const tableReducer = createReducer(
  initialState,

  on(TableActions.setSortPagination, (state, action): TableState => (
    { ...state, params: action.params }
  )),

);
