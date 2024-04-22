import { createReducer, on } from '@ngrx/store';
import { EventCategoryEntity, EventTargetGroupEntity, Maybe } from 'src/app/core/api/generated/schema';
import { EventFilterQueryParams } from 'src/app/core/typings/filter-params/event-filter-param';
import { EventFilterActions } from './event-filter.actions';

export interface EventFilterState {
  categories?: Maybe<EventCategoryEntity[]>,
  targetGroups?: Maybe<EventTargetGroupEntity[]>,
  params?: EventFilterQueryParams,
}

export const initialState: EventFilterState = { };

export const eventFilterReducer = createReducer(
  initialState,

  on(EventFilterActions.setCategories, (state, action): EventFilterState => (
    { ...state, categories: action.result }
  )),

  on(EventFilterActions.setTargetGroups, (state, action): EventFilterState => (
    { ...state, targetGroups: action.result }
  )),

);
