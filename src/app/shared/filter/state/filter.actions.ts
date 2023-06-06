import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventTargetGroupEntity, Maybe } from 'src/schema/schema';

export const FilterActions = createActionGroup({
  source: 'Filter',
  events: {
    'clear all': emptyProps(),

    'get target groups': emptyProps(),
    'set target groups': (result : EventTargetGroupEntity[]) => ({ result }),
    'select target groups': (targetGroupIds?: Maybe<string[]>) => ({ targetGroupIds }),
  }
});




