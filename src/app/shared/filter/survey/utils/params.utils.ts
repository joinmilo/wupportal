import { FilterSortPaginateInput, QueryOperator } from 'src/app/core/api/generated/schema';
import { SurveyFilterQueryDefinition, SurveyFilterQueryParams } from 'src/app/core/typings/filter-params/survey-filter-param';

export const createSurveyParams = (queryParams?: SurveyFilterQueryParams) => {
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