/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetEventFormQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.EventEntityInput>;
}>;


export type GetEventFormQuery = { __typename?: 'Query', getEvent?: { __typename?: 'EventEntity', id?: string | null, schedules?: Array<{ __typename?: 'EventScheduleEntity', id?: string | null, startDate?: any | null, endDate?: any | null } | null> | null } | null };

export const GetEventFormDocument = gql`
    query getEventForm($entity: EventEntityInput) {
  getEvent(entity: $entity) {
    id
    schedules {
      id
      startDate
      endDate
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEventFormGQL extends Apollo.Query<GetEventFormQuery, GetEventFormQueryVariables> {
    override document = GetEventFormDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }