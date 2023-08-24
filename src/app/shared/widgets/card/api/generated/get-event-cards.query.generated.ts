/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetEventCardsQueryVariables = Types.Exact<{
  params?: Types.InputMaybe<Types.FilterSortPaginateInput>;
  scheduleBegin?: Types.InputMaybe<Types.Scalars['OffsetDateTime']>;
  scheduleEnd?: Types.InputMaybe<Types.Scalars['OffsetDateTime']>;
}>;


export type GetEventCardsQuery = { __typename?: 'Query', getEvents?: { __typename?: 'PageableList_EventEntity', total: any, result?: Array<{ __typename?: 'EventEntity' } | null> | null } | null };

export const GetEventCardsDocument = gql`
    query getEventCards($params: FilterSortPaginateInput, $scheduleBegin: OffsetDateTime, $scheduleEnd: OffsetDateTime) {
  getEvents(params: $params) {
    result {
      ...EventCards
    }
    total
  }
}
    ${EventCardsFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEventCardsGQL extends Apollo.Query<GetEventCardsQuery, GetEventCardsQueryVariables> {
    override document = GetEventCardsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }