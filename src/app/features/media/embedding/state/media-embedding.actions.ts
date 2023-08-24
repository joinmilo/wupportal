import { createActionGroup, emptyProps } from '@ngrx/store';
import { InfoMediaEntity } from 'src/app/core/api/generated/schema';

export const MediaEmbeddingActions = createActionGroup({
  source: 'Media Embedding',
  events: {
    'get recent media': emptyProps(),
    'set recent media': (media?: InfoMediaEntity[]) => ({ media }),
  }
});
