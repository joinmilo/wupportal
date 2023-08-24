/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type SaveGuestArticleMutationVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.ArticleEntityInput>;
}>;


export type SaveGuestArticleMutation = { __typename?: 'Mutation', saveArticle?: { __typename?: 'ArticleEntity', id?: string | null } | null };

export const SaveGuestArticleDocument = gql`
    mutation saveGuestArticle($entity: ArticleEntityInput) {
  saveArticle(entity: $entity) {
    id
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class SaveGuestArticleGQL extends Apollo.Mutation<SaveGuestArticleMutation, SaveGuestArticleMutationVariables> {
    override document = SaveGuestArticleDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }