/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type SuburbFragment = { __typename?: 'SuburbEntity', id?: string | null, name?: string | null };

export const SuburbFragmentDoc = gql`
    fragment Suburb on SuburbEntity {
  id
  name
}
    `;