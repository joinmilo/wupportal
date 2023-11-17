/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetOrganisationConfigurationQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetOrganisationConfigurationQuery = { __typename?: 'Query', getOrganisationConfiguration?: { __typename?: 'OrganisationConfigurationEntity', id?: string | null, approvalRequired?: boolean | null, memberRole?: { __typename?: 'RoleEntity', id?: string | null, translatables?: Array<{ __typename?: 'RoleTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null } | null };

export const GetOrganisationConfigurationDocument = gql`
    query getOrganisationConfiguration {
  getOrganisationConfiguration(entity: {}) {
    id
    approvalRequired
    memberRole {
      id
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
  export class GetOrganisationConfigurationGQL extends Apollo.Query<GetOrganisationConfigurationQuery, GetOrganisationConfigurationQueryVariables> {
    override document = GetOrganisationConfigurationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }