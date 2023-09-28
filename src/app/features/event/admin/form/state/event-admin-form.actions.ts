import { createActionGroup } from '@ngrx/store';
import { EventEntity, Maybe } from 'src/app/core/api/generated/schema';

export const EventAdminFormActions = createActionGroup({
  source: 'Event Admin Form',
  events: {
    'get event': (slug: Maybe<string>) => ({ slug }),
    'event retrieved': (event: Maybe<EventEntity>) => ({ event })
  }
});
