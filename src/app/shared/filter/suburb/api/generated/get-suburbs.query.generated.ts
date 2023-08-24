/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { SuburbFragmentDoc } from '../../../../../core/api/generated/suburb.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetSuburbsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetSuburbsQuery = { __typename?: 'Query', getSuburbs?: { __typename?: 'PageableList_SuburbEntity', result?: Array<{ __typename?: 'SuburbEntity', id?: string | null, name?: string | null } | null> | null } | null };

export const GetSuburbsDocument = gql`
    query getSuburbs {
  getSuburbs {
    result {
      ...Suburb
    }
  }
}
    ${SuburbFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSuburbsGQL extends Apollo.Query<GetSuburbsQuery, GetSuburbsQueryVariables> {
    override document = GetSuburbsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }