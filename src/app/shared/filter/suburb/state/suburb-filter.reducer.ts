import { createReducer, on } from '@ngrx/store';
import { Maybe, SuburbEntity } from 'src/app/core/api/generated/schema';
import { SuburbFilterActions } from './suburb-filter.actions';

export interface SuburbFilterState {
  suburbs?: Maybe<SuburbEntity[]>,
}

export const initialState: SuburbFilterState = { };

export const suburbFilterReducer = createReducer(
  initialState,

  on(SuburbFilterActions.setSuburbs, (state, action): SuburbFilterState => (
    { ...state, suburbs: action.result }
  )),

);
