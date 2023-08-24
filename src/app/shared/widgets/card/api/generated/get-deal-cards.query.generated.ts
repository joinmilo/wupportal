/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetDealCardsQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
}>;


export type GetDealCardsQuery = { __typename?: 'Query', getDeals?: { __typename?: 'PageableList_DealEntity', total: any, result?: Array<{ __typename?: 'DealEntity' } | null> | null } | null };

export const GetDealCardsDocument = gql`
    query getDealCards($params: FilterSortPaginateInput) {
  getDeals(params: $params) {
    result {
      ...DealCard
    }
    total
  }
}
    ${DealCardFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetDealCardsGQL extends Apollo.Query<GetDealCardsQuery, GetDealCardsQueryVariables> {
    override document = GetDealCardsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }