import { IntervalFilter } from 'src/app/core/api/generated/schema';
import { Period } from 'src/app/core/typings/period';

export interface AnalyticsParams {
  period?: Period,
  interval: IntervalFilter,
}