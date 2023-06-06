import { Maybe } from 'src/schema/schema';
import { FilterQueryParams } from '../constants/filter.constants';

export type OverviewFilterQueryParams = {
  [FilterQueryParams.categories]?: Maybe<string[]>,
  [FilterQueryParams.currentOnly]?: Maybe<string[]>,
  [FilterQueryParams.freeOnly]?: Maybe<string[]>,
  [FilterQueryParams.targetGroups]?: Maybe<string[]>,
  [FilterQueryParams.suburbs]?: Maybe<string[]>,
};