import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventEntity } from 'src/app/core/api/generated/schema';

export const EventEmbeddingActions = createActionGroup({
  source: 'Event Embedding',
  events: {
    'get recent events': emptyProps(),
    'set recent events': (events?: EventEntity[]) => ({ events }),
  }
});




