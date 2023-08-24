/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetInfoMediaCategoriesQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetInfoMediaCategoriesQuery = { __typename?: 'Query', getInfoMediaCategories?: { __typename?: 'PageableList_InfoMediaCategoryEntity', result?: Array<{ __typename?: 'InfoMediaCategoryEntity', id?: string | null, translatables?: Array<{ __typename?: 'InfoMediaCategoryTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, name?: string | null, locale?: string | null } | null } | null> | null } | null> | null } | null };

export const GetInfoMediaCategoriesDocument = gql`
    query getInfoMediaCategories($params: FilterSortPaginateInput) {
  getInfoMediaCategories(params: $params) {
    result {
      id
      translatables {
        id
        name
        language {
          id
          name
          locale
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetInfoMediaCategoriesGQL extends Apollo.Query<GetInfoMediaCategoriesQuery, GetInfoMediaCategoriesQueryVariables> {
    override document = GetInfoMediaCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }