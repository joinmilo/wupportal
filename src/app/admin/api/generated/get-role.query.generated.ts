/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetRoleQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.RoleEntityInput>;
}>;


export type GetRoleQuery = { __typename?: 'Query', getRole?: { __typename?: 'RoleEntity', id?: string | null, name?: string | null, privileges?: Array<{ __typename?: 'RolePrivilegeEntity', id?: string | null, code?: string | null } | null> | null, users?: Array<{ __typename?: 'UserEntity', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null } | null> | null } | null };

export const GetRoleDocument = gql`
    query getRole($entity: RoleEntityInput) {
  getRole(entity: $entity) {
    id
    name
    privileges {
      id
      code
    }
    users {
      id
      firstName
      lastName
      email
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRoleGQL extends Apollo.Query<GetRoleQuery, GetRoleQueryVariables> {
    override document = GetRoleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }