import { createActionGroup, emptyProps } from '@ngrx/store';
import { ContestEntity } from 'src/app/core/api/generated/schema';

export const ContestEmbeddingActions = createActionGroup({
  source: 'Contest Page Feature',
  events: {
    'get recent contests': emptyProps(),
    'set recent contests': (contests?: ContestEntity[]) => ({ contests }),
  }
});




