/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
export type PublicAuthorFragment = { __typename?: 'ArticlePublicAuthorEntity', id?: string | null, name?: string | null, email?: string | null, phone?: string | null };

export const PublicAuthorFragmentDoc = gql`
    fragment PublicAuthor on ArticlePublicAuthorEntity {
  id
  name
  email
  phone
}
    `;