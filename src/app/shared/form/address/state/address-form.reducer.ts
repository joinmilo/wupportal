import { createReducer, on } from '@ngrx/store';
import { Maybe, SuburbEntity } from 'src/app/core/api/generated/schema';
import { AddressFormActions } from './address-form.actions';

export interface AddressFormState {
  suburbs?: Maybe<SuburbEntity[]>,
}

export const initialState: AddressFormState = { };

export const addressFormReducer = createReducer(
  initialState,

  on(AddressFormActions.suburbsRetrieved, (state, action): AddressFormState => (
    { ...state, suburbs: action.result }
  )),
);
