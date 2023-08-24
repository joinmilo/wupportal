/* eslint-disable */
import * as Types from './schema';

import { gql } from 'apollo-angular';
export type RatingDtoFragment = { __typename?: 'RatingDto', average?: number | null, distribution?: any | null, total?: number | null };

export const RatingDtoFragmentDoc = gql`
    fragment RatingDto on RatingDto {
  average
  distribution
  total
}
    `;