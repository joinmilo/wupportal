import { Maybe } from 'src/app/core/api/generated/schema';

export enum MediaFilterQueryDefinition {
  mediaCategories = 'media-categories',
  mediaTypes = 'media-types',
}

export type MediaFilterQueryParams = {
  [MediaFilterQueryDefinition.mediaCategories]?: Maybe<string[]>,
  [MediaFilterQueryDefinition.mediaTypes]?: Maybe<string[]>,
};
