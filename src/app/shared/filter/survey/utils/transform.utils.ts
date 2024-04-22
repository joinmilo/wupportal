import { Maybe } from 'ngx-cinlib/core';
import { Filter } from 'ngx-cinlib/filters';
import { FilterSortPaginateInput, QueryOperator } from 'src/app/core/api/generated/schema';
import { SurveyFilterQueryDefinition } from 'src/app/core/typings/filter-params/survey-filter-param';

export const transformFn = (queryParams?: Maybe<{ [key: string]: string }>): Filter => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

   if (!queryParams || !queryParams[SurveyFilterQueryDefinition.past]) {
    params.expression?.conjunction?.operands?.push({
      entity: {
        path: 'dueDate',
        operator: QueryOperator.GreaterOrEqual,
        value: new Date().toISOString()
      }
    });
  }

  return params;
}