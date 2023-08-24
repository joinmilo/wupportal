/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from './language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetLanguagesQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetLanguagesQuery = { __typename?: 'Query', getLanguages?: { __typename?: 'PageableList_LanguageEntity', result?: Array<{ __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null> | null } | null };

export const GetLanguagesDocument = gql`
    query getLanguages($params: FilterSortPaginateInput) {
  getLanguages(params: $params) {
    result {
      ...Language
    }
  }
}
    ${LanguageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetLanguagesGQL extends Apollo.Query<GetLanguagesQuery, GetLanguagesQueryVariables> {
    override document = GetLanguagesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }