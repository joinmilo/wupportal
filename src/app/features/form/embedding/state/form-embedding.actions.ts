import { createActionGroup, emptyProps } from '@ngrx/store';
import { UserContextEntity } from 'src/schema/schema';

export const FormEmbeddingActions = createActionGroup({
  source: 'Form Embedding',
  events: {
    'get recent forms': emptyProps(),
    'set recent forms': (forms?: UserContextEntity[]) => ({ forms }),
  }
});




