import { Maybe } from 'src/schema/schema';

export enum FilterQueryDefinition {
  suburbs = 'suburbs',
  endDate = 'end',
  startDate = 'start',
}

export enum ArticleFilterQueryDefinition {
  articleCategories = 'article-categories',
}

export type ArticleFilterQueryParams = {
  [ArticleFilterQueryDefinition.articleCategories]?: Maybe<string[]>,
  [FilterQueryDefinition.endDate]?: Maybe<string>,
  [EventFilterQueryDefinition.freeOnly]?: Maybe<boolean | string>,
  [FilterQueryDefinition.startDate]?: Maybe<string>,
  [EventFilterQueryDefinition.past]?: Maybe<boolean | string>,
  [EventFilterQueryDefinition.targetGroups]?: Maybe<string[]>,
  [FilterQueryDefinition.suburbs]?: Maybe<string[]>,
};

export enum EventFilterQueryDefinition {
  eventCategories = 'event-categories',
  freeOnly = 'free-only',
  past = 'past',
  targetGroups = 'targetgroups',
}

export type EventFilterQueryParams = {
  [EventFilterQueryDefinition.eventCategories]?: Maybe<string[]>,
  [FilterQueryDefinition.endDate]?: Maybe<string>,
  [EventFilterQueryDefinition.freeOnly]?: Maybe<boolean | string>,
  [FilterQueryDefinition.startDate]?: Maybe<string>,
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
