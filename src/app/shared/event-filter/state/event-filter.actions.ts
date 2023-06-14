import { Params } from '@angular/router';
import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventCategoryEntity, EventTargetGroupEntity, SuburbEntity } from 'src/schema/schema';
import { EventFilterQueryParams } from '../typings/event-filter-query-param';

export const EventFilterActions = createActionGroup({
  source: 'Event Filter',
  events: {
    'update': (params: Params) => ({ params }),
    'updated': (params: EventFilterQueryParams) => ({ params }),
    'clear all': emptyProps(),
    
    'get categories': emptyProps(),
    'set categories': (result: EventCategoryEntity[]) => ({ result }),

    'get suburbs': emptyProps(),
    'set suburbs': (result: SuburbEntity[]) => ({ result }),
    
    'get target groups': emptyProps(),
    'set target groups': (result : EventTargetGroupEntity[]) => ({ result }),
 
  }
});




