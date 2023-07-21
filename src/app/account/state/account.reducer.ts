import { createReducer, on } from '@ngrx/store';
import { Maybe } from 'src/schema/schema';
import { UserEntity } from '../../../schema/schema';
import { AccountActions } from './account.actions';

export interface AccountState {
  user?: Maybe<UserEntity>,
  verified?: Maybe<boolean>,
  token?: Maybe<string>,
}

export const initialState: AccountState = {
};

export const accountReducer = createReducer(
  initialState,

  on(AccountActions.verified, (state, action): AccountState => (
    { ...state, verified: action.verified}
  )),

  on(AccountActions.registered, (state, action): AccountState => (
    { ...state, user: action.entity }
  )),

);
