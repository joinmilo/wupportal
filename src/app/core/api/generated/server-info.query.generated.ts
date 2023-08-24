/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetServerInformationQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetServerInformationQuery = { __typename?: 'Query', getInformation?: { __typename?: 'InformationDto', version?: string | null } | null };

export const GetServerInformationDocument = gql`
    query getServerInformation {
  getInformation {
    version
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetServerInformationGQL extends Apollo.Query<GetServerInformationQuery, GetServerInformationQueryVariables> {
    override document = GetServerInformationDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }