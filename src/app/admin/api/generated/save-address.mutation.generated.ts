/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveAddressMutationVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.AddressEntityInput>;
}>;


export type SaveAddressMutation = { __typename?: 'Mutation', saveAddress?: { __typename?: 'AddressEntity', id?: string | null } | null };

export const SaveAddressDocument = gql`
    mutation saveAddress($entity: AddressEntityInput) {
  saveAddress(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveAddressGQL extends Apollo.Mutation<SaveAddressMutation, SaveAddressMutationVariables> {
    override document = SaveAddressDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }