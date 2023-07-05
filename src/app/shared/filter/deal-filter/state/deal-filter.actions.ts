import { Params } from '@angular/router';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { DealFilterQueryParams } from 'src/app/core/typings/filter-params/deal-filter-param';
import { DealCategoryEntity } from 'src/schema/schema';

export const DealFilterActions = createActionGroup({
  source: 'Deal Filter',
  events: {
    'init': emptyProps(),
    'query params initialized': (params: Params) => ({ params }),
    'browser navigated': (params: Params) => ({ params }),
    'all updated': (params: DealFilterQueryParams) => ({ params }),
    'clear all': emptyProps(),

    'get categories': emptyProps(),
    'set categories': (result: DealCategoryEntity[]) => ({ result }),
    'selected categories': (categoryIds?: Maybe<string[]>) => ({ categoryIds }),

    'selected offer only': (value?: boolean) => ({ value }),
    'selected search only': (value?: boolean) => ({ value }),
 
  }
});




