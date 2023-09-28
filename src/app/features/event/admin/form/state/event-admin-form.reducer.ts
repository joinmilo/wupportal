import { createReducer, on } from '@ngrx/store';
import { EventEntity, Maybe } from 'src/app/core/api/generated/schema';
import { EventAdminFormActions } from './event-admin-form.actions';

export interface EventAdminFormState {
  event?: Maybe<EventEntity>,
}

export const initialState: EventAdminFormState = { };

export const eventAdminFormReducer = createReducer(
  initialState,

  on(EventAdminFormActions.eventRetrieved, (state, action): EventAdminFormState => (
    { ...state, event: action.event }
  )),

);
