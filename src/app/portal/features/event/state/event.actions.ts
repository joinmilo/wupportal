import { createActionGroup } from '@ngrx/store';
import { EventEntity, Maybe } from 'src/schema/schema';

export const EventActions = createActionGroup({
  source: 'Event',
  events: {
    'get event details': (slug: string) => ({ slug }),
    'set event details': (event: Maybe<EventEntity>) => ({ event }),
  }
});




