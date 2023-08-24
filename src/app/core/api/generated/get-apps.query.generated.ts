/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetAppsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAppsQuery = { __typename?: 'Query', getApps?: { __typename?: 'PageableList_AppEntity', result?: Array<{ __typename?: 'AppEntity', id?: string | null, url?: string | null, platform?: { __typename?: 'AppPlatformEntity', id?: string | null, code?: string | null, name?: string | null } | null } | null> | null } | null };

export const GetAppsDocument = gql`
    query getApps {
  getApps {
    result {
      id
      url
      platform {
        id
        code
        name
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAppsGQL extends Apollo.Query<GetAppsQuery, GetAppsQueryVariables> {
    override document = GetAppsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }