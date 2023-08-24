/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveOrganisationRatingMutationVariables = Types.Exact<{
  entity: Types.OrganisationRatingEntityInput;
}>;


export type SaveOrganisationRatingMutation = { __typename?: 'Mutation', saveOrganisationRating?: { __typename?: 'OrganisationRatingEntity', id?: string | null } | null };

export const SaveOrganisationRatingDocument = gql`
    mutation saveOrganisationRating($entity: OrganisationRatingEntityInput!) {
  saveOrganisationRating(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveOrganisationRatingGQL extends Apollo.Mutation<SaveOrganisationRatingMutation, SaveOrganisationRatingMutationVariables> {
    override document = SaveOrganisationRatingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }