/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type ContactFragment = { __typename?: 'ContactEntity', id?: string | null, email?: string | null, name?: string | null, phone?: string | null, preferredContact?: boolean | null, website?: string | null };

export const ContactFragmentDoc = gql`
    fragment Contact on ContactEntity {
  id
  email
  name
  phone
  preferredContact
  website
}
    `;