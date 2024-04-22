import { Maybe } from 'ngx-cinlib/core';
import { Filter } from 'ngx-cinlib/filters';
import { FilterSortPaginateInput } from 'src/app/core/api/generated/schema';
import { ContestFilterQueryDefinition } from 'src/app/core/typings/filter-params/contest-filter-param';
import { createListParam } from 'src/app/core/utils/params.utils';

export const transformFn = (queryParams?: Maybe<{ [key: string]: string }>): Filter => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams?.[ContestFilterQueryDefinition.contestTypes]) {

    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams[ContestFilterQueryDefinition.contestTypes],
        'type.id'
      )
    );
  }

  return params;
}