/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetEventCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetEventCategoriesQuery = { __typename?: 'Query', getEventCategories?: { __typename?: 'PageableList_EventCategoryEntity', result?: Array<{ __typename?: 'EventCategoryEntity', id?: string | null, color?: string | null, icon?: string | null, name?: string | null, translatables?: Array<{ __typename?: 'EventCategoryTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetEventCategoriesDocument = gql`
    query getEventCategories {
  getEventCategories {
    result {
      id
      color
      icon
      name
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
  export class GetEventCategoriesGQL extends Apollo.Query<GetEventCategoriesQuery, GetEventCategoriesQueryVariables> {
    override document = GetEventCategoriesDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }