import { createReducer, on } from '@ngrx/store';
import { DealCategoryEntity, Maybe } from 'src/app/core/api/generated/schema';
import { DealFilterQueryParams } from 'src/app/core/typings/filter-params/deal-filter-param';
import { DealFilterActions } from './deal-filter.actions';

export interface DealFilterState {
  categories?: Maybe<DealCategoryEntity[]>,
  params?: DealFilterQueryParams,
}

export const initialState: DealFilterState = { };

export const dealFilterReducer = createReducer(
  initialState,

  on(DealFilterActions.setCategories, (state, action): DealFilterState => (
    { ...state, categories: action.result }
  )),

);
