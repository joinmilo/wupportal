import { ConjunctionOperator, FilterSortPaginateInput, Maybe, QueryExpressionInput, QueryOperator } from 'src/schema/schema';
import { EventFilterQueryDefinition, EventFilterQueryParams } from '../typings/event-filter-query-param';

export const createParams = (queryParams: EventFilterQueryParams) => {
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

  if (queryParams[EventFilterQueryDefinition.suburbs]) {
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
        })
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

export const createListParam = (
  param: Maybe<string[] | string>,
  field: string): QueryExpressionInput => {
  return (typeof param === 'string' || param?.length === 1)
    ? {
      entity: {
        path: field,
        operator: QueryOperator.Equal,
        value: typeof param === 'string' ? param : param[0]
      }
    }
    : {
      conjunction: {
        operands: param?.map(id => ({
          entity: {
            path: field,
            operator: QueryOperator.Equal,
            value: id
          }
        })),
        operator: ConjunctionOperator.Or
      }
    };
}