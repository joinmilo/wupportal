/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type LanguageFragment = { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null };

export const LanguageFragmentDoc = gql`
    fragment Language on LanguageEntity {
  id
  locale
  name
}
    `;