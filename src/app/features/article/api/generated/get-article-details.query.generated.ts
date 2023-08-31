/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { ArticleCategoryFragmentDoc } from './article-category.fragment.generated';
import { RatingDtoFragmentDoc } from '../../../../core/api/generated/rating.fragment.generated';
import { CommentatorFragmentDoc } from '../../../../core/api/generated/commentator.fragment.generated';
import { MediaFragmentDoc } from '../../../../core/api/generated/media.fragment.generated';
import { PublicAuthorFragmentDoc } from './article-public-author.fragment.generated';
import { LanguageFragmentDoc } from '../../../../core/api/generated/language.fragment.generated';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type GetArticleDetailsQueryVariables = Types.Exact<{
  entity?: Types.InputMaybe<Types.ArticleEntityInput>;
}>;


export type GetArticleDetailsQuery = { __typename?: 'Query', getArticle?: { __typename?: 'ArticleEntity', id?: string | null, approved?: boolean | null, created?: any | null, modified?: any | null, slug?: string | null, author?: { __typename?: 'UserContextEntity', slug?: string | null, user?: { __typename?: 'UserEntity', firstName?: string | null, lastName?: string | null } | null } | null, category?: { __typename?: 'ArticleCategoryEntity', id?: string | null, color?: string | null, icon?: string | null, translatables?: Array<{ __typename?: 'ArticleCategoryTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, name?: string | null, locale?: string | null } | null } | null> | null } | null, calculatedRatings?: { __typename?: 'RatingDto', average?: number | null, distribution?: any | null, total?: number | null } | null, lastArticleComment?: { __typename?: 'ArticleCommentEntity', id?: string | null, created?: any | null, modified?: any | null, userContext?: { __typename?: 'UserContextEntity', id?: string | null, uploads?: Array<{ __typename?: 'UserContextMediaEntity', profilePicture?: boolean | null, title?: boolean | null, media?: { __typename?: 'MediaEntity', id?: string | null, created?: any | null, extension?: string | null, mimeType?: string | null, modified?: any | null, name?: string | null, size?: any | null, url?: string | null, attribution?: { __typename?: 'MediaAttributionEntity', id?: string | null, title?: string | null, author?: string | null, source?: string | null, license?: string | null } | null } | null } | null> | null, user?: { __typename?: 'UserEntity', id?: string | null, firstName?: string | null, lastName?: string | null } | null } | null, translatables?: Array<{ __typename?: 'ArticleCommentTranslatableEntity', id?: string | null, content?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null, uploads?: Array<{ __typename?: 'ArticleMediaEntity', title?: boolean | null, card?: boolean | null, media?: { __typename?: 'MediaEntity', id?: string | null, created?: any | null, extension?: string | null, mimeType?: string | null, modified?: any | null, name?: string | null, size?: any | null, url?: string | null, attribution?: { __typename?: 'MediaAttributionEntity', id?: string | null, title?: string | null, author?: string | null, source?: string | null, license?: string | null } | null } | null } | null> | null, favoritingUsers?: Array<{ __typename?: 'UserContextEntity', id?: string | null } | null> | null, publicAuthor?: { __typename?: 'ArticlePublicAuthorEntity', id?: string | null, name?: string | null, email?: string | null, phone?: string | null } | null, translatables?: Array<{ __typename?: 'ArticleTranslatableEntity', id?: string | null, content?: string | null, shortDescription?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null } | null };

export const GetArticleDetailsDocument = gql`
    query getArticleDetails($entity: ArticleEntityInput) {
  getArticle(entity: $entity) {
    id
    approved
    created
    modified
    slug
    author {
      slug
      user {
        firstName
        lastName
      }
    }
    category {
      ...ArticleCategory
    }
    calculatedRatings {
      ...RatingDto
    }
    lastArticleComment {
      id
      created
      modified
      userContext {
        ...Commentator
      }
      translatables {
        id
        content
        language {
          id
          locale
          name
        }
      }
    }
    uploads {
      title
      card
      media {
        ...Media
      }
    }
    favoritingUsers {
      id
    }
    publicAuthor {
      ...PublicAuthor
    }
    translatables {
      id
      content
      shortDescription
      name
      language {
        ...Language
      }
    }
  }
}
    ${ArticleCategoryFragmentDoc}
${RatingDtoFragmentDoc}
${CommentatorFragmentDoc}
${MediaFragmentDoc}
${PublicAuthorFragmentDoc}
${LanguageFragmentDoc}`;

  @Injectable({
    providedIn: 'root'
  })
  export class GetArticleDetailsGQL extends Apollo.Query<GetArticleDetailsQuery, GetArticleDetailsQueryVariables> {
    override document = GetArticleDetailsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }