/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAddressQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.AddressEntityInput>;
}>;


export type GetAddressQuery = { __typename?: 'Query', getAddress?: { __typename?: 'AddressEntity', id?: string | null, houseNumber?: string | null, latitude?: number | null, longitude?: number | null, place?: string | null, postalCode?: string | null, street?: string | null, suburb?: { __typename?: 'SuburbEntity', id?: string | null, name?: string | null } | null } | null };

export const GetAddressDocument = gql`
    query getAddress($entity: AddressEntityInput) {
  getAddress(entity: $entity) {
    id
    houseNumber
    latitude
    longitude
    place
    postalCode
    street
    suburb {
      id
      name
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAddressGQL extends Apollo.Query<GetAddressQuery, GetAddressQueryVariables> {
    override document = GetAddressDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }