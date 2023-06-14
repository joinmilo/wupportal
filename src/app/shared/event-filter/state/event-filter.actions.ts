import { Params } from '@angular/router';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { Period } from 'src/app/core/typings/period';
import { EventCategoryEntity, EventTargetGroupEntity, Maybe, SuburbEntity } from 'src/schema/schema';
import { EventFilterQueryParams } from '../typings/event-filter-query-param';

export const EventFilterActions = createActionGroup({
  source: 'Event Filter',
  events: {
    'update all': (queryParams: Params) => ({ queryParams }),
    'all updated': (params: EventFilterQueryParams) => ({ params }),
    'clear all': emptyProps(),
    
    'get categories': emptyProps(),
    'set categories': (result: EventCategoryEntity[]) => ({ result }),
    'selected categories': (categoryIds?: Maybe<string[]>) => ({ categoryIds }),

    'get suburbs': emptyProps(),
    'set suburbs': (result: SuburbEntity[]) => ({ result }),
    'selected suburbs': (suburbIds?: Maybe<string[]>) => ({ suburbIds }),
    
    'get target groups': emptyProps(),
    'set target groups': (result : EventTargetGroupEntity[]) => ({ result }),
    'selected target groups': (targetGroupIds?: Maybe<string[]>) => ({ targetGroupIds }),

    'selected period': (period?: Period) => ({ period }),
    'selected free only': (value?: boolean) => ({ value }),
    'selected past': (value?: boolean) => ({ value }),
 
  }
});




