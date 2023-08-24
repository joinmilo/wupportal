/* eslint-disable */
import * as Types from '../../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetEventTargetGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetEventTargetGroupsQuery = { __typename?: 'Query', getEventTargetGroups?: { __typename?: 'PageableList_EventTargetGroupEntity', result?: Array<{ __typename?: 'EventTargetGroupEntity', id?: string | null, translatables?: Array<{ __typename?: 'EventTargetGroupTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null> | null } | null };

export const GetEventTargetGroupsDocument = gql`
    query getEventTargetGroups {
  getEventTargetGroups {
    result {
      id
      translatables {
        id
        name
        language {
          ...Language
        }
      }
    }
  }
}
    ${LanguageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetEventTargetGroupsGQL extends Apollo.Query<GetEventTargetGroupsQuery, GetEventTargetGroupsQueryVariables> {
    override document = GetEventTargetGroupsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }