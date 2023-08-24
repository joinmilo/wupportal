import { createFeatureSelector, createSelector } from '@ngrx/store';
import { accountFeatureKey } from '../constants/account.constants';
import { AccountState } from './account.reducer';

export const selectAccountState = createFeatureSelector<AccountState>(accountFeatureKey);

export const selectAccountVerified = createSelector(
  selectAccountState,
  state => !!state.verified
);

export const selectRegisteredUserId = createSelector(
  selectAccountState,
  state => state.registeredUserId
);

export const selectAccountToken = createSelector(
  selectAccountState,
  state => state.token
);

export const selectOrganisations = createSelector(
  selectAccountState,
  state => state.organisations
);