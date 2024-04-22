import { createReducer, on } from '@ngrx/store';
import { ContestTypeEntity, Maybe } from 'src/app/core/api/generated/schema';
import { ContestFilterActions } from './contest-filter.actions';

export interface ContestFilterState {
  types?: Maybe<ContestTypeEntity[]>,
}

export const initialState: ContestFilterState = { };

export const contestFilterReducer = createReducer(
  initialState,

  on(ContestFilterActions.setTypes, (state, action): ContestFilterState => (
    { ...state, types: action.result }
  )),

)