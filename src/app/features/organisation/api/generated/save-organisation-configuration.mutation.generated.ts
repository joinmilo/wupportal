/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveOrganisationConfigurationMutationVariables = Types.Exact<{
  entity: Types.OrganisationConfigurationEntityInput;
}>;


export type SaveOrganisationConfigurationMutation = { __typename?: 'Mutation', saveOrganisationConfiguration?: { __typename?: 'OrganisationConfigurationEntity', id?: string | null } | null };

export const SaveOrganisationConfigurationDocument = gql`
    mutation saveOrganisationConfiguration($entity: OrganisationConfigurationEntityInput!) {
  saveOrganisationConfiguration(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveOrganisationConfigurationGQL extends Apollo.Mutation<SaveOrganisationConfigurationMutation, SaveOrganisationConfigurationMutationVariables> {
    override document = SaveOrganisationConfigurationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }