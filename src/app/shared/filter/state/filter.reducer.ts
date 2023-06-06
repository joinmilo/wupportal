import { createReducer, on } from '@ngrx/store';
import { EventTargetGroupEntity, Maybe } from 'src/schema/schema';
import { FilterQueryParams } from '../constants/filter.constants';
import { OverviewFilterQueryParams } from '../typings/query-param';
import { FilterActions } from './filter.actions';

export interface FilterState {
  targetGroups?: Maybe<EventTargetGroupEntity[]>,
  params?: OverviewFilterQueryParams,
}

export const initialState: FilterState = { };

export const filterReducer = createReducer(
  initialState,

  on(FilterActions.clearAll, (state): FilterState => (
    { ...state, params: undefined }
  )),

  on(FilterActions.setTargetGroups, (state, action): FilterState => (
    { ...state, targetGroups: action.result }
  )),

  on(FilterActions.selectTargetGroups, (state, action): FilterState => (
    { ...state,
      params: {...state.params,
        [FilterQueryParams.targetGroups]: action.targetGroupIds
      } 
    }
  )),

);
