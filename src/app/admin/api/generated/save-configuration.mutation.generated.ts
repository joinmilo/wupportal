/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveConfigurationMutationVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.ConfigurationEntityInput>;
}>;


export type SaveConfigurationMutation = { __typename?: 'Mutation', saveConfiguration?: { __typename?: 'ConfigurationEntity', id?: string | null } | null };

export const SaveConfigurationDocument = gql`
    mutation saveConfiguration($entity: ConfigurationEntityInput) {
  saveConfiguration(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveConfigurationGQL extends Apollo.Mutation<SaveConfigurationMutation, SaveConfigurationMutationVariables> {
    override document = SaveConfigurationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }