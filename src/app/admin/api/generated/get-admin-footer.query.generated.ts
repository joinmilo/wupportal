/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAdminFooterParentsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAdminFooterParentsQuery = { __typename?: 'Query', getAdminFooterParents?: { __typename?: 'PageableList_AdminFooterParentEntity', result?: Array<{ __typename?: 'AdminFooterParentEntity', id?: string | null, items?: Array<{ __typename?: 'AdminFooterItemEntity', id?: string | null, url?: string | null, translatables?: Array<{ __typename?: 'AdminFooterItemTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null, translatables?: Array<{ __typename?: 'AdminFooterParentTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetAdminFooterParentsDocument = gql`
    query getAdminFooterParents {
  getAdminFooterParents {
    result {
      id
      items {
        id
        url
        translatables {
          id
          name
          language {
            ...Language
          }
        }
      }
      translatables {
        id
        name
        language {
          ...Language
        }
      }
    }
  }
}
    ${LanguageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAdminFooterParentsGQL extends Apollo.Query<GetAdminFooterParentsQuery, GetAdminFooterParentsQueryVariables> {
    override document = GetAdminFooterParentsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }