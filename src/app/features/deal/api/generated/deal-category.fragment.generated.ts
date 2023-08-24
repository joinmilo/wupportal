/* eslint-disable */
import * as Types from '../../../../core/api/generated/schema';

import { gql } from 'apollo-angular';
import { LanguageFragmentDoc } from '../../../../core/api/generated/language.fragment.generated';
export type DealCategoryFragment = { __typename?: 'DealCategoryEntity', id?: string | null, color?: string | null, icon?: string | null, created?: any | null, translatables?: Array<{ __typename?: 'DealCategoryTranslatableEntity', id?: string | null, name?: string | null, language?: { __typename?: 'LanguageEntity', id?: string | null, locale?: string | null, name?: string | null } | null } | null> | null };

export const DealCategoryFragmentDoc = gql`
    fragment DealCategory on DealCategoryEntity {
  id
  color
  icon
  created
  color
  icon
  translatables {
    id
    name
    language {
      ...Language
    }
  }
}
    ${LanguageFragmentDoc}`;