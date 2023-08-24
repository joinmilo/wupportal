/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveOrganisationCommentMutationVariables = Types.Exact<{
  entity: Types.OrganisationCommentEntityInput;
}>;


export type SaveOrganisationCommentMutation = { __typename?: 'Mutation', saveOrganisationComment?: { __typename?: 'OrganisationCommentEntity', id?: string | null } | null };

export const SaveOrganisationCommentDocument = gql`
    mutation saveOrganisationComment($entity: OrganisationCommentEntityInput!) {
  saveOrganisationComment(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveOrganisationCommentGQL extends Apollo.Mutation<SaveOrganisationCommentMutation, SaveOrganisationCommentMutationVariables> {
    override document = SaveOrganisationCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }