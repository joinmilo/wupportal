/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetPageDetailsLayoutQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.PageEntityInput>;
}>;


export type GetPageDetailsLayoutQuery = { __typename?: 'Query', getPage?: { __typename?: 'PageEntity', id?: string | null, slug?: string | null, label?: string | null } | null };

export const GetPageDetailsLayoutDocument = gql`
    query getPageDetailsLayout($entity: PageEntityInput) {
  getPage(entity: $entity) {
    id
    slug
    label
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetPageDetailsLayoutGQL extends Apollo.Query<GetPageDetailsLayoutQuery, GetPageDetailsLayoutQueryVariables> {
    override document = GetPageDetailsLayoutDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }