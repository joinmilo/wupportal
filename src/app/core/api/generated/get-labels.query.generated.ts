/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from './language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetLabelsQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetLabelsQuery = { __typename?: 'Query', getLabels?: { __typename?: 'PageableList_LabelEntity', result?: Array<{ __typename?: 'LabelEntity', id?: string | null, tagId?: string | null, translatables?: Array<{ __typename?: 'LabelTranslatablesEntity', id?: string | null, content?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetLabelsDocument = gql`
    query getLabels($params: FilterSortPaginateInput) {
  getLabels(params: $params) {
    result {
      id
      tagId
      translatables {
        id
        content
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
  export class GetLabelsGQL extends Apollo.Query<GetLabelsQuery, GetLabelsQueryVariables> {
    override document = GetLabelsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }