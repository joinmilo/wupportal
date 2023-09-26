/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveSuburbMutationVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.SuburbEntityInput>;
}>;


export type SaveSuburbMutation = { __typename?: 'Mutation', saveSuburb?: { __typename?: 'SuburbEntity', id?: string | null } | null };

export const SaveSuburbDocument = gql`
    mutation saveSuburb($entity: SuburbEntityInput) {
  saveSuburb(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveSuburbGQL extends Apollo.Mutation<SaveSuburbMutation, SaveSuburbMutationVariables> {
    override document = SaveSuburbDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }