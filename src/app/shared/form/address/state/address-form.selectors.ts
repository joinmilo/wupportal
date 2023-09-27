import { createFeatureSelector, createSelector } from '@ngrx/store';
import { addressFormStateKey } from '../constants/address-form.constants';
import { AddressFormState } from './address-form.reducer';


export const selectAddressFormState = createFeatureSelector<AddressFormState>(addressFormStateKey);

export const selectSuburbs = createSelector(
  selectAddressFormState,
  state => state.suburbs
);