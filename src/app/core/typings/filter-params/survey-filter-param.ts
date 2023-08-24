import { Maybe } from 'src/app/core/api/generated/schema';

export enum SurveyFilterQueryDefinition {
  past = 'past',
}

export type SurveyFilterQueryParams = {
  [SurveyFilterQueryDefinition.past]?: Maybe<boolean | string>,
};
