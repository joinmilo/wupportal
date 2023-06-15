import { Maybe } from 'src/schema/schema';

export enum CalendarQueryDefinition {
  selectedMonth = 'selected-month',
  selectedDay = 'selected-day',
}

export type CalendarQueryParams = {
  [CalendarQueryDefinition.selectedMonth]?: Maybe<string>,
  [CalendarQueryDefinition.selectedDay]?: Maybe<string>,
};