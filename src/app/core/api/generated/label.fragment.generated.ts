/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type LabelFragment = { __typename?: 'LabelEntity', id?: string | null, tagId?: string | null, translatables?: Array<{ __typename?: 'LabelTranslatablesEntity', id?: string | null, content?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null };

export const LabelFragmentDoc = gql`
    fragment Label on LabelEntity {
  id
  tagId
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
    `;