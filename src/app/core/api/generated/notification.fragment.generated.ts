/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from './language.fragment.generated';
export type NotificationFragment = { __typename?: 'NotificationEntity', id?: string | null, read?: boolean | null, modified?: any | null, translatables?: Array<{ __typename?: 'NotificationTranslatableEntity', content?: string | null, id?: string | null, title?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null };

export const NotificationFragmentDoc = gql`
    fragment Notification on NotificationEntity {
  id
  read
  modified
  translatables {
    content
    id
    title
    language {
      ...Language
    }
  }
}
    ${LanguageFragmentDoc}`;