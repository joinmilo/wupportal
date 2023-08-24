import { Params } from '@angular/router';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { Maybe } from 'src/app/core/api/generated/schema';
import { OrganisationFilterQueryParams } from 'src/app/core/typings/filter-params/organisation-filter-param';

export const OrganisationFilterActions = createActionGroup({
  source: 'Organisation Filter',
  events: {
    'init': emptyProps(),
    'query params initialized': (params: Params) => ({ params }),
    'browser navigated': (params: Params) => ({ params }),
    'update all': (queryParams: Params) => ({ queryParams }),
    'all updated': (params: OrganisationFilterQueryParams) => ({ params }),
    'clear all': emptyProps(),

    'selected suburbs': (suburbIds?: Maybe<string[]>) => ({ suburbIds }),

    'selected active only': (value?: boolean) => ({ value }),
 
  }
});




