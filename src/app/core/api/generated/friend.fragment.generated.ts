/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type FriendFragment = { __typename?: 'FriendEntity', id?: string | null, accepted?: boolean | null, addressee?: { __typename?: 'UserContextEntity', id?: string | null, user?: { __typename?: 'UserEntity', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, phone?: string | null } | null } | null, requester?: { __typename?: 'UserContextEntity', id?: string | null, user?: { __typename?: 'UserEntity', id?: string | null, firstName?: string | null, lastName?: string | null, email?: string | null, phone?: string | null } | null } | null };

export const FriendFragmentDoc = gql`
    fragment Friend on FriendEntity {
  id
  accepted
  addressee {
    id
    user {
      id
      firstName
      lastName
      email
      phone
    }
  }
  requester {
    id
    user {
      id
      firstName
      lastName
      email
      phone
    }
  }
}
    `;