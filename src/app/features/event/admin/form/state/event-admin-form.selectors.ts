import { createFeatureSelector, createSelector } from '@ngrx/store';
import { eventAdminFormStateKey } from '../constants/event-admin-form.constants';
import { EventAdminFormState } from './event-admin-form.reducer';

export const selectEventAdminFormState = createFeatureSelector<EventAdminFormState>(eventAdminFormStateKey);

export const selectEvent = createSelector(
  selectEventAdminFormState,
  state => state.event
);