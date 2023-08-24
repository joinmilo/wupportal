/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { SuburbFragmentDoc } from './suburb.fragment.generated';
export type AddressFragment = { __typename?: 'AddressEntity', id?: string | null, houseNumber?: string | null, place?: string | null, postalCode?: string | null, street?: string | null, latitude?: number | null, longitude?: number | null, suburb?: { __typename?: 'SuburbEntity', id?: string | null, name?: string | null } | null };

export const AddressFragmentDoc = gql`
    fragment Address on AddressEntity {
  id
  houseNumber
  place
  postalCode
  street
  latitude
  longitude
  suburb {
    ...Suburb
  }
}
    ${SuburbFragmentDoc}`;