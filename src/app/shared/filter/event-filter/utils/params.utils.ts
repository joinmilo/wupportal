import { EventFilterQueryDefinition, EventFilterQueryParams, FilterQueryDefinition } from 'src/app/core/typings/filter-param';
import { createListParam } from 'src/app/core/utils/params.utils';
import { FilterSortPaginateInput, QueryOperator } from 'src/schema/schema';

export const createEventParams = (queryParams: EventFilterQueryParams) => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams[EventFilterQueryDefinition.categories]) {

    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.categories,
        'category.id'
      )
    );
  }

  if (queryParams[FilterQueryDefinition.suburbs]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.suburbs,
        'address.suburb.id'
      )
    );
  }

  if (queryParams[EventFilterQueryDefinition.targetGroups]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.targetgroups,
        'targetGroups.id'
      )
    );
  }

  if (!queryParams[EventFilterQueryDefinition.past]) {
    queryParams[EventFilterQueryDefinition.startDate]
      || queryParams[EventFilterQueryDefinition.endDate]
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

  if (queryParams[EventFilterQueryDefinition.freeOnly]) {
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