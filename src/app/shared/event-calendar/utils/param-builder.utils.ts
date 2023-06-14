import { Period } from 'src/app/core/typings/period';
import { ConjunctionOperator, FilterSortPaginateInput, Maybe, QueryExpressionInput, QueryOperator } from 'src/schema/schema';
import { EventFilterQueryDefinition, EventFilterQueryParams } from '../../../core/typings/filter-query-param';

export const createCalendarParams = (
  queryParams?: Maybe<EventFilterQueryParams>,
  period?: Maybe<Period>,
  isEvent = true,
  ) => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams && queryParams[EventFilterQueryDefinition.categories]) {

    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.categories,
        isEvent ? 'category.id' : 'event.category.id'
      )
    );
  }

  if (queryParams && queryParams[EventFilterQueryDefinition.suburbs]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.suburbs,
        isEvent ? 'address.suburb.id' : 'event.address.suburb.id'
      )
    );
  }

  if (queryParams && queryParams[EventFilterQueryDefinition.targetGroups]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.targetgroups,
        isEvent ? 'targetGroups.id' : 'event.targetGroups.id'
      )
    );
  }

  if (period) {
    params.expression?.conjunction?.operands?.push(
      {
        entity: {
          path: isEvent ? 'schedules.startDate' : 'startDate',
          operator: QueryOperator.GreaterOrEqual,
          value: period?.startDate.toISOString(),
        }
      },
      {
        entity: {
          path: isEvent ? 'schedules.startDate' : 'startDate',
          operator: QueryOperator.LessOrEqual,
          value: period?.endDate.toISOString(),
        }
      }
    )
  }

  if (queryParams && queryParams[EventFilterQueryDefinition.freeOnly]) {
    params.expression?.conjunction?.operands?.push({
      entity: {
        path: isEvent ? 'entryFee' : 'event.entryFee',
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