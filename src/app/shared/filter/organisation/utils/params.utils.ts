import { FilterSortPaginateInput, QueryOperator } from 'src/app/core/api/generated/schema';
import { FilterQueryDefinition } from 'src/app/core/typings/filter-params/filter-param';
import { OrganisationFilterQueryDefinition, OrganisationFilterQueryParams } from 'src/app/core/typings/filter-params/organisation-filter-param';
import { createListParam } from 'src/app/core/utils/params.utils';

export const createOrganisationParams = (queryParams?: OrganisationFilterQueryParams) => {
  const params = {
    expression: {
      conjunction: {
        operands: [],
      }
    }
  } as FilterSortPaginateInput;

  if (queryParams && queryParams[FilterQueryDefinition.suburbs]) {
    params.expression?.conjunction?.operands?.push(
      createListParam(
        queryParams?.suburbs,
        'address.suburb.id'
      )
    );
  }

  if (queryParams && queryParams[OrganisationFilterQueryDefinition.activeEvents]) {
    params.expression?.conjunction?.operands?.push({
      entity: {
        path: 'events.schedules.startDate',
        operator: QueryOperator.GreaterOrEqual,
        value: new Date().toISOString()
      }
    });
  }

  return params;
}