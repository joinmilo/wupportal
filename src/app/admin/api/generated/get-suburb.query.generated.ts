/* eslint-disable */
import * as Types from '../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetSuburbQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.SuburbEntityInput>;
}>;


export type GetSuburbQuery = { __typename?: 'Query', getSuburb?: { __typename?: 'SuburbEntity', id?: string | null, name?: string | null, longitude?: number | null, latitude?: number | null } | null };

export const GetSuburbDocument = gql`
    query getSuburb($entity: SuburbEntityInput) {
  getSuburb(entity: $entity) {
    id
    name
    longitude
    latitude
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetSuburbGQL extends Apollo.Query<GetSuburbQuery, GetSuburbQueryVariables> {
    override document = GetSuburbDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }