import { createReducer, on } from '@ngrx/store';
import { Maybe, OrganisationEntity } from 'src/app/core/api/generated/schema';
import { AccountActions } from './account.actions';

export interface AccountState {
  registeredUserId?: Maybe<string>,
  verified?: Maybe<boolean>,
  token?: Maybe<string>,
  organisations?: Maybe<OrganisationEntity[]>
}

export const initialState: AccountState = {
};

export const accountReducer = createReducer(
  initialState,

  on(AccountActions.verified, (state, action): AccountState => (
    { ...state, verified: action.verified}
  )),

  on(AccountActions.registered, (state, action): AccountState => (
    { ...state, registeredUserId: action.entityId }
  )),

  on(AccountActions.setOrganisations, (state, action): AccountState => (
    { ...state, organisations: action.entities }
  )),
);
