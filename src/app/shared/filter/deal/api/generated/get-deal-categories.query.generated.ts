/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetDealCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetDealCategoriesQuery = { __typename?: 'Query', getDealCategories?: { __typename?: 'PageableList_DealCategoryEntity', result?: Array<{ __typename?: 'DealCategoryEntity', id?: string | null, color?: string | null, icon?: string | null, created?: any | null, translatables?: Array<{ __typename?: 'DealCategoryTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetDealCategoriesDocument = gql`
    query getDealCategories {
  getDealCategories {
    result {
      id
      color
      icon
      created
      color
      icon
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
  export class GetDealCategoriesGQL extends Apollo.Query<GetDealCategoriesQuery, GetDealCategoriesQueryVariables> {
    override document = GetDealCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }