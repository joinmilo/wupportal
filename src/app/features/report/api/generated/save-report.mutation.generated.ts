/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveReportMutationVariables = Types.Exact<{
  entity: Types.ReportEntityInput;
}>;


export type SaveReportMutation = { __typename?: 'Mutation', saveReport?: { __typename?: 'ReportEntity', id?: string | null } | null };

export const SaveReportDocument = gql`
    mutation saveReport($entity: ReportEntityInput!) {
  saveReport(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveReportGQL extends Apollo.Mutation<SaveReportMutation, SaveReportMutationVariables> {
    override document = SaveReportDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }