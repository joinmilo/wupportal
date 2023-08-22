import { createActionGroup, emptyProps } from '@ngrx/store';
import { ArticleEntity } from 'src/schema/schema';

export const GuestArticleEmbeddingActions = createActionGroup({
  source: 'Guest Article Embedding',
  events: {
    'get recent guest articles': emptyProps(),
    'set recent guest articles': (articles?: ArticleEntity[]) => ({ articles }),
  }
});
