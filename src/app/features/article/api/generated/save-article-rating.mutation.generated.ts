/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveArticleRatingMutationVariables = Types.Exact<{
  entity: Types.ArticleRatingEntityInput;
}>;


export type SaveArticleRatingMutation = { __typename?: 'Mutation', saveArticleRating?: { __typename?: 'ArticleRatingEntity', id?: string | null } | null };

export const SaveArticleRatingDocument = gql`
    mutation saveArticleRating($entity: ArticleRatingEntityInput!) {
  saveArticleRating(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveArticleRatingGQL extends Apollo.Mutation<SaveArticleRatingMutation, SaveArticleRatingMutationVariables> {
    override document = SaveArticleRatingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }