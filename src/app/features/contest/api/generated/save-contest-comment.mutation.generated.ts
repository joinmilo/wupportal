/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveContestCommentMutationVariables = Types.Exact<{
  entity: Types.ContestCommentEntityInput;
}>;


export type SaveContestCommentMutation = { __typename?: 'Mutation', saveContestComment?: { __typename?: 'ContestCommentEntity', id?: string | null } | null };

export const SaveContestCommentDocument = gql`
    mutation saveContestComment($entity: ContestCommentEntityInput!) {
  saveContestComment(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveContestCommentGQL extends Apollo.Mutation<SaveContestCommentMutation, SaveContestCommentMutationVariables> {
    override document = SaveContestCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }