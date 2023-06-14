import { createReducer, on } from '@ngrx/store';
import { EventCategoryEntity, EventTargetGroupEntity, Maybe, SuburbEntity } from 'src/schema/schema';
import { EventFilterQueryParams } from '../typings/event-filter-query-param';
import { EventFilterActions } from './event-filter.actions';

export interface EventFilterState {
  categories?: Maybe<EventCategoryEntity[]>,
  suburbs?: Maybe<SuburbEntity[]>,
  targetGroups?: Maybe<EventTargetGroupEntity[]>,
  params: EventFilterQueryParams,
}

export const initialState: EventFilterState = {
  params: {}
};

export const eventFilterReducer = createReducer(
  initialState,

  on(EventFilterActions.updated, (state, action): EventFilterState => (
    { ...state, params: action.params }
  )),

  on(EventFilterActions.clearAll, (state): EventFilterState => (
    { ...state, params: {} }
  )),

  on(EventFilterActions.setCategories, (state, action): EventFilterState => (
    { ...state, categories: action.result }
  )),

  on(EventFilterActions.setSuburbs, (state, action): EventFilterState => (
    { ...state, suburbs: action.result }
  )),

  on(EventFilterActions.setTargetGroups, (state, action): EventFilterState => (
    { ...state, targetGroups: action.result }
  )),

);
