import { Maybe } from 'src/schema/schema';

export enum FilterQueryDefinition {
  suburbs = 'suburbs',
}

export enum EventFilterQueryDefinition {
  categories = 'categories',
  endDate = 'end',
  freeOnly = 'free-only',
  past = 'past',
  startDate = 'start',
  targetGroups = 'targetgroups',
}

export type EventFilterQueryParams = {
  [EventFilterQueryDefinition.categories]?: Maybe<string[]>,
  [EventFilterQueryDefinition.endDate]?: Maybe<string>,
  [EventFilterQueryDefinition.freeOnly]?: Maybe<boolean | string>,
  [EventFilterQueryDefinition.startDate]?: Maybe<string>,
  [EventFilterQueryDefinition.past]?: Maybe<boolean | string>,
  [EventFilterQueryDefinition.targetGroups]?: Maybe<string[]>,
  [FilterQueryDefinition.suburbs]?: Maybe<string[]>,
};

export enum OrganisationFilterQueryDefinition {
  activeEvents = 'active-events',
}

export type OrganisationFilterQueryParams = {
  [OrganisationFilterQueryDefinition.activeEvents]?: Maybe<boolean | string>,
  [FilterQueryDefinition.suburbs]?: Maybe<string[]>,
};
