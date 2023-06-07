import { createReducer, on } from '@ngrx/store';
import { EventCategoryEntity, EventTargetGroupEntity, Maybe } from 'src/schema/schema';
import { EventFilterDefinition } from '../constants/event-filter.constants';
import { EventFilterQueryParams } from '../typings/event-filter-query-param';
import { EventFilterActions } from './event-filter.actions';

export interface EventFilterState {
  categories?: Maybe<EventCategoryEntity[]>,
  targetGroups?: Maybe<EventTargetGroupEntity[]>,
  params?: EventFilterQueryParams,
}

export const initialState: EventFilterState = { };

export const eventFilterReducer = createReducer(
  initialState,

  on(EventFilterActions.initialized, (state, action): EventFilterState => (
    { ...state, params: action.params }
  )),

  on(EventFilterActions.clearAll, (state): EventFilterState => (
    { ...state, params: undefined }
  )),

  on(EventFilterActions.setCategories, (state, action): EventFilterState => (
    { ...state, categories: action.result }
  )),

  on(EventFilterActions.selectedCategories, (state, action): EventFilterState => (
    {
      ...state,
      params: {
        ...state.params,
        [EventFilterDefinition.categories]: action.categoryIds
      }
    }
  )),

  on(EventFilterActions.setTargetGroups, (state, action): EventFilterState => (
    { ...state, targetGroups: action.result }
  )),

  on(EventFilterActions.selectedTargetGroups, (state, action): EventFilterState => (
    { ...state,
      params: {...state.params,
        [EventFilterDefinition.targetGroups]: action.targetGroupIds
      } 
    }
  )),

  on(EventFilterActions.selectedFreeOnly, (state, action): EventFilterState => (
    {
      ...state,
      params: {
        ...state.params,
        [EventFilterDefinition.freeOnly]: action.value
      }
    }
  )),

);
