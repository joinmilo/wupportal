import { createActionGroup, emptyProps } from '@ngrx/store';
import { DealEntity } from 'src/schema/schema';

export const DealEmbeddingActions = createActionGroup({
  source: 'Deal Embedding',
  events: {
    'get recent deals': emptyProps(),
    'set recent deals': (deals?: DealEntity[]) => ({ deals }),
  }
});




