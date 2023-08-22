import { createActionGroup, emptyProps } from '@ngrx/store';
import { ArticleEntity } from 'src/schema/schema';

export const ArticleEmbeddngActions = createActionGroup({
  source: 'Article Embedding',
  events: {
    'get recent articles': emptyProps(),
    'set recent articles': (articles?: ArticleEntity[]) => ({ articles }),
  }
});
