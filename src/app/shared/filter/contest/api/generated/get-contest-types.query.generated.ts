/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetContestTypesQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetContestTypesQuery = { __typename?: 'Query', getContestTypes?: { __typename?: 'PageableList_ContestTypeEntity', result?: Array<{ __typename?: 'ContestTypeEntity', id?: string | null, translatables?: Array<{ __typename?: 'ContestTypeTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, name?: string | null, locale?: string | null } | null } | null> | null } | null> | null } | null };

export const GetContestTypesDocument = gql`
    query getContestTypes($params: FilterSortPaginateInput) {
  getContestTypes(params: $params) {
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
  export class GetContestTypesGQL extends Apollo.Query<GetContestTypesQuery, GetContestTypesQueryVariables> {
    override document = GetContestTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }