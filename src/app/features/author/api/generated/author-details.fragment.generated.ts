/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { MediaFragmentDoc } from '../../../../core/api/generated/media.fragment.generated';
export type AuthorDetailsFragment = { __typename?: 'UserContextEntity', id?: string | null, description?: string | null, slug?: string | null, translatables?: Array<{ __typename?: 'UserContextTranslatableEntity', id?: string | null, description?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null, uploads?: Array<{ __typename?: 'UserContextMediaEntity', profilePicture?: boolean | null, title?: boolean | null, media?: { __typename?: 'MediaEntity', id?: string | null, created?: any | null, extension?: string | null, mimeType?: string | null, modified?: any | null, name?: string | null, size?: any | null, url?: string | null, attribution?: { __typename?: 'MediaAttributionEntity', id?: string | null, title?: string | null, author?: string | null, source?: string | null, license?: string | null } | null } | null } | null> | null, articles?: Array<{ __typename?: 'ArticleEntity', id?: string | null } | null> | null, user?: { __typename?: 'UserEntity', firstName?: string | null, lastName?: string | null, email?: string | null } | null };

export const AuthorDetailsFragmentDoc = gql`
    fragment AuthorDetails on UserContextEntity {
  id
  description
  slug
  translatables {
    id
    description
    language {
      id
      locale
      name
    }
  }
  uploads {
    profilePicture
    title
    media {
      ...Media
    }
  }
  articles {
    id
  }
  user {
    firstName
    lastName
    email
  }
}
    ${MediaFragmentDoc}`;