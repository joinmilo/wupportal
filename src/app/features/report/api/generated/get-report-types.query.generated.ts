/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetReportTypesQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetReportTypesQuery = { __typename?: 'Query', getReportTypes?: { __typename?: 'PageableList_ReportTypeEntity', result?: Array<{ __typename?: 'ReportTypeEntity', id?: string | null, translatables?: Array<{ __typename?: 'ReportTypeTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetReportTypesDocument = gql`
    query getReportTypes($params: FilterSortPaginateInput) {
  getReportTypes(params: $params) {
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
  }
}
    ${LanguageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetReportTypesGQL extends Apollo.Query<GetReportTypesQuery, GetReportTypesQueryVariables> {
    override document = GetReportTypesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }