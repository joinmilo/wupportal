/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetRolesQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetRolesQuery = { __typename?: 'Query', getRoles?: { __typename?: 'PageableList_RoleEntity', total: any, result?: Array<{ __typename?: 'RoleEntity', id?: string | null, name?: string | null, privileges?: Array<{ __typename?: 'RolePrivilegeEntity', id?: string | null, code?: string | null } | null> | null, users?: Array<{ __typename?: 'UserEntity', id?: string | null } | null> | null } | null> | null } | null };

export const GetRolesDocument = gql`
    query getRoles($params: FilterSortPaginateInput) {
  getRoles(params: $params) {
    result {
      id
      name
      privileges {
        id
        code
      }
      users {
        id
      }
    }
    total
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRolesGQL extends Apollo.Query<GetRolesQuery, GetRolesQueryVariables> {
    override document = GetRolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }