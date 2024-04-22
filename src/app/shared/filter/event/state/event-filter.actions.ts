import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventCategoryEntity, EventTargetGroupEntity } from 'src/app/core/api/generated/schema';

export const EventFilterActions = createActionGroup({
  source: 'Event Filter',
  events: {   
    'get categories': emptyProps(),
    'set categories': (result: EventCategoryEntity[]) => ({ result }),
    
    'get target groups': emptyProps(),
    'set target groups': (result : EventTargetGroupEntity[]) => ({ result }), 
  }
});




