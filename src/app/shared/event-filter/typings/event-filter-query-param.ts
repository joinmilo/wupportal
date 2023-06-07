import { Maybe } from 'src/schema/schema';
import { EventFilterDefinition } from '../constants/event-filter.constants';

export type EventFilterQueryParams = {
  [EventFilterDefinition.categories]?: Maybe<string[]>,
  [EventFilterDefinition.currentOnly]?: Maybe<boolean | string>,
  [EventFilterDefinition.freeOnly]?: Maybe<boolean | string>,
  [EventFilterDefinition.targetGroups]?: Maybe<string[]>,
  [EventFilterDefinition.suburbs]?: Maybe<string[]>,
};