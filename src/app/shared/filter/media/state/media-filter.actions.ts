import { createActionGroup, emptyProps } from '@ngrx/store';
import { InfoMediaCategoryEntity } from 'src/app/core/api/generated/schema';

export const MediaFilterActions = createActionGroup({
  source: 'Media Filter',
  events: {
    'get categories': emptyProps(),
    'set categories': (result: InfoMediaCategoryEntity[]) => ({ result }),
  }
});




