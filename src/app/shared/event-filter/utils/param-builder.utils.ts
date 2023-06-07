import { ConjunctionOperator, FilterSortPaginateInput, Maybe, QueryExpressionInput, QueryOperator } from 'src/schema/schema';
import { EventFilterQueryParams } from '../typings/event-filter-query-param';

export const createParams = (queryParams?: EventFilterQueryParams) => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams?.categories) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.categories,
        'category.id'
      )
    );
  }

  if (queryParams?.suburbs) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.suburbs,
        'address.suburb.id'
      )
    );
  }

  if (queryParams?.targetgroups) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.targetgroups,
        'targetGroups.id'
      )
    );
  }

  if (queryParams && queryParams['current-only']) {
    params.expression?.conjunction?.operands?.push({
      entity: {
        path: 'schedules.startDate',
        operator: QueryOperator.GreaterOrEqual,
        value: new Date().toISOString()
      }
    });
  }

  if (queryParams && queryParams['free-only']) {
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