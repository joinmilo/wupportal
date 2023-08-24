import { FilterSortPaginateInput, QueryOperator } from 'src/app/core/api/generated/schema';
import { EventFilterQueryDefinition, EventFilterQueryParams } from 'src/app/core/typings/filter-params/event-filter-param';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { createListParam } from 'src/app/core/utils/params.utils';

export const createEventParams = (queryParams?: EventFilterQueryParams) => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams && queryParams[EventFilterQueryDefinition.eventCategories]) {

    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams[EventFilterQueryDefinition.eventCategories],
        'category.id'
      )
    );
  }

  if (queryParams && queryParams[FilterQueryDefinition.suburbs]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams[FilterQueryDefinition.suburbs],
        'address.suburb.id'
      )
    );
  }

  if (queryParams && queryParams[EventFilterQueryDefinition.targetGroups]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams[EventFilterQueryDefinition.targetGroups],
        'targetGroups.id'
      )
    );
  }

  if (!queryParams || !queryParams[EventFilterQueryDefinition.past]) {
    queryParams && queryParams[FilterQueryDefinition.startDate]
      || queryParams && queryParams[FilterQueryDefinition.endDate]
      ? params.expression?.conjunction?.operands?.push(
          {
            entity: {
              path: 'schedules.startDate',
              operator: QueryOperator.GreaterOrEqual,
              value: queryParams?.start
            }
          },
          {
            entity: {
              path: 'schedules.startDate',
              operator: QueryOperator.LessOrEqual,
              value: queryParams?.end
            }
          }
        )
      : params.expression?.conjunction?.operands?.push({
          entity: {
            path: 'schedules.startDate',
            operator: QueryOperator.GreaterOrEqual,
            value: new Date().toISOString()
          }
        });
  }

  if (queryParams && queryParams[EventFilterQueryDefinition.freeOnly]) {
    params.expression?.conjunction?.operands?.push({
      entity: {
        path: 'entryFee',
        operator: QueryOperator.Equal,
        value: null
      }
    });
  }

  return params;
}