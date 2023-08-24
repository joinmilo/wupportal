import { Maybe } from 'src/app/core/api/generated/schema';

export enum ContestFilterQueryDefinition {
  contestTypes = 'contest-types',
}

export type ContestFilterQueryParams = {
  [ContestFilterQueryDefinition.contestTypes]?: Maybe<string[]>,
};