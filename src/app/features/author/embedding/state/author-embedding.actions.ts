import { createActionGroup, emptyProps } from '@ngrx/store';
import { UserContextEntity } from 'src/schema/schema';

export const AuthorEmbeddingActions = createActionGroup({
  source: 'Author Page Feature',
  events: {
    'get recent authors': emptyProps(),
    'set recent authors': (authors?: UserContextEntity[]) => ({ authors }),
  }
});
