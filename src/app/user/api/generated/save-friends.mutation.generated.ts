/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveFriendsMutationVariables = Types.Exact<{
  entities?: Types.InputMaybe<Array<Types.FriendEntityInput> | Types.FriendEntityInput>;
}>;


export type SaveFriendsMutation = { __typename?: 'Mutation', saveFriends?: Array<{ __typename?: 'FriendEntity', id?: string | null } | null> | null };

export const SaveFriendsDocument = gql`
    mutation saveFriends($entities: [FriendEntityInput!]) {
  saveFriends(entities: $entities) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveFriendsGQL extends Apollo.Mutation<SaveFriendsMutation, SaveFriendsMutationVariables> {
    override document = SaveFriendsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }