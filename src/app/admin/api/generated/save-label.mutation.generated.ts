/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveLabelMutationVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.LabelEntityInput>;
}>;


export type SaveLabelMutation = { __typename?: 'Mutation', saveLabel?: { __typename?: 'LabelEntity', id?: string | null } | null };

export const SaveLabelDocument = gql`
    mutation saveLabel($entity: LabelEntityInput) {
  saveLabel(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveLabelGQL extends Apollo.Mutation<SaveLabelMutation, SaveLabelMutationVariables> {
    override document = SaveLabelDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }