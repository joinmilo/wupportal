/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveFriendMutationVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.FriendEntityInput>;
}>;


export type SaveFriendMutation = { __typename?: 'Mutation', saveFriend?: { __typename?: 'FriendEntity', id?: string | null } | null };

export const SaveFriendDocument = gql`
    mutation saveFriend($entity: FriendEntityInput) {
  saveFriend(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveFriendGQL extends Apollo.Mutation<SaveFriendMutation, SaveFriendMutationVariables> {
    override document = SaveFriendDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }