import { Maybe } from 'src/schema/schema';

export enum EventFilterQueryDefinition {
  categories = 'categories',
  endDate = 'end',
  freeOnly = 'free-only',
  past = 'past',
  startDate = 'start',
  suburbs = 'suburbs',
  targetGroups = 'targetgroups',
}

export type EventFilterQueryParams = {
  [EventFilterQueryDefinition.categories]?: Maybe<string[]>,
  [EventFilterQueryDefinition.endDate]?: Maybe<string>,
  [EventFilterQueryDefinition.freeOnly]?: Maybe<boolean | string>,
  [EventFilterQueryDefinition.startDate]?: Maybe<string>,
  [EventFilterQueryDefinition.past]?: Maybe<boolean | string>,
  [EventFilterQueryDefinition.targetGroups]?: Maybe<string[]>,
  [EventFilterQueryDefinition.suburbs]?: Maybe<string[]>,
};
