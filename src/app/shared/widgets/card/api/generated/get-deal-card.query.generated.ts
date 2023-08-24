/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetDealCardQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.DealEntityInput>;
}>;


export type GetDealCardQuery = { __typename?: 'Query', getDeal?: { __typename?: 'DealEntity' } | null };

export const GetDealCardDocument = gql`
    query getDealCard($entity: DealEntityInput) {
  getDeal(entity: $entity) {
    ...DealCard
  }
}
    ${DealCardFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDealCardGQL extends Apollo.Query<GetDealCardQuery, GetDealCardQueryVariables> {
    override document = GetDealCardDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }