import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventEntity } from 'src/schema/schema';

export const EventEmbeddingActions = createActionGroup({
  source: 'Event Embedding',
  events: {
    'get recent events': emptyProps(),
    'set recent events': (events?: EventEntity[]) => ({ events }),
  }
});




