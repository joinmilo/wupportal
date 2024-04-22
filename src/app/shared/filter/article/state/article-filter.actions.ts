import { createActionGroup, emptyProps } from '@ngrx/store';
import { ArticleCategoryEntity } from 'src/app/core/api/generated/schema';

export const ArticleFilterActions = createActionGroup({
  source: 'Article Filter',
  events: {  
    'get categories': emptyProps(),
    'set categories': (result: ArticleCategoryEntity[]) => ({ result }), 
  }
});




