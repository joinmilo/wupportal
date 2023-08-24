/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetThemeQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetThemeQuery = { __typename?: 'Query', getThemes?: { __typename?: 'PageableList_ThemeEntity', result?: Array<{ __typename?: 'ThemeEntity', id?: string | null, isDefault?: boolean | null, name?: string | null, variables?: Array<{ __typename?: 'ThemeVariableEntity', id?: string | null, code?: string | null, value?: string | null } | null> | null } | null> | null } | null };

export const GetThemeDocument = gql`
    query getTheme {
  getThemes {
    result {
      id
      isDefault
      name
      variables {
        id
        code
        value
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetThemeGQL extends Apollo.Query<GetThemeQuery, GetThemeQueryVariables> {
    override document = GetThemeDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }