/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveArticleCommentMutationVariables = Types.Exact<{
  entity: Types.ArticleCommentEntityInput;
}>;


export type SaveArticleCommentMutation = { __typename?: 'Mutation', saveArticleComment?: { __typename?: 'ArticleCommentEntity', id?: string | null } | null };

export const SaveArticleCommentDocument = gql`
    mutation saveArticleComment($entity: ArticleCommentEntityInput!) {
  saveArticleComment(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveArticleCommentGQL extends Apollo.Mutation<SaveArticleCommentMutation, SaveArticleCommentMutationVariables> {
    override document = SaveArticleCommentDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }