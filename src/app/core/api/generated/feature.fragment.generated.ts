/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type FeatureFragment = { __typename?: 'FeatureEntity', id?: string | null, active?: boolean | null, icon?: string | null, name?: string | null, code?: string | null };

export const FeatureFragmentDoc = gql`
    fragment Feature on FeatureEntity {
  id
  active
  icon
  name
  code
}
    `;