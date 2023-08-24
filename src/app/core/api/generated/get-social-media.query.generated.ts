/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetSocialMediaQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSocialMediaQuery = { __typename?: 'Query', getSocialMedias?: { __typename?: 'PageableList_SocialMediaEntity', result?: Array<{ __typename?: 'SocialMediaEntity', id?: string | null, icon?: string | null, name?: string | null, url?: string | null } | null> | null } | null };

export const GetSocialMediaDocument = gql`
    query getSocialMedia {
  getSocialMedias {
    result {
      id
      icon
      name
      url
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSocialMediaGQL extends Apollo.Query<GetSocialMediaQuery, GetSocialMediaQueryVariables> {
    override document = GetSocialMediaDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }