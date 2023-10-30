/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveRoleMutationVariables = Types.Exact<{
  entity: Types.RoleEntityInput;
}>;


export type SaveRoleMutation = { __typename?: 'Mutation', saveRole?: { __typename?: 'RoleEntity', id?: string | null } | null };

export const SaveRoleDocument = gql`
    mutation saveRole($entity: RoleEntityInput!) {
  saveRole(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveRoleGQL extends Apollo.Mutation<SaveRoleMutation, SaveRoleMutationVariables> {
    override document = SaveRoleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }