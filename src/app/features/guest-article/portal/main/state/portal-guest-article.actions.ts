import { createActionGroup } from '@ngrx/store';
import { ArticleEntity, ArticleEntityInput } from 'src/app/core/api/generated/schema';

export const PortalGuestArticleActions = createActionGroup({
  source: 'Portal Guest Article',
  events: {
    'save article': (entity: ArticleEntityInput) => ({ entity }),
    'article saved': (entity: ArticleEntity) => ({ entity }),
  }
});