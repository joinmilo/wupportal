import { Maybe } from 'src/schema/schema';
import { EventFilterDefinition } from '../constants/event-filter.constants';

export type EventFilterQueryParams = {
  [EventFilterDefinition.categories]?: Maybe<string[]>,
  [EventFilterDefinition.freeOnly]?: Maybe<boolean | string>,
  [EventFilterDefinition.past]?: Maybe<boolean | string>,
  [EventFilterDefinition.targetGroups]?: Maybe<string[]>,
  [EventFilterDefinition.suburbs]?: Maybe<string[]>,
};