/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetRolesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetRolesQuery = { __typename?: 'Query', getRoles?: { __typename?: 'PageableList_RoleEntity', total: any, result?: Array<{ __typename?: 'RoleEntity', id?: string | null, translatables?: Array<{ __typename?: 'RoleTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetRolesDocument = gql`
    query getRoles {
  getRoles {
    result {
      id
      translatables {
        id
        name
        language {
          ...Language
        }
      }
    }
    total
  }
}
    ${LanguageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetRolesGQL extends Apollo.Query<GetRolesQuery, GetRolesQueryVariables> {
    override document = GetRolesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }