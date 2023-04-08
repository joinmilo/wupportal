import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventEntity, Maybe } from 'src/schema/schema';

export const EventActions = createActionGroup({
  source: 'Event',
  events: {
    'get event details': (slug: string) => ({ slug }),
    'set event details': (event: Maybe<EventEntity>) => ({ event }),

    'get sponsored event': emptyProps(),
    'set sponsored event': (event: Maybe<EventEntity>) => ({ event }),
  }
});




