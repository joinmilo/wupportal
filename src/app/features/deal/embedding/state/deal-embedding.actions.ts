import { createActionGroup, emptyProps } from '@ngrx/store';
import { DealEntity } from 'src/app/core/api/generated/schema';

export const DealEmbeddingActions = createActionGroup({
  source: 'Deal Embedding',
  events: {
    'get recent deals': emptyProps(),
    'set recent deals': (deals?: DealEntity[]) => ({ deals }),
  }
});




