import { createActionGroup, emptyProps } from '@ngrx/store';
import { DealCategoryEntity, Maybe } from 'src/app/core/api/generated/schema';

export const DealFilterActions = createActionGroup({
  source: 'Deal Filter',
  events: {
    'get categories': emptyProps(),
    'set categories': (result: DealCategoryEntity[]) => ({ result }),
    'selected categories': (categoryIds?: Maybe<string[]>) => ({ categoryIds }),

    'selected offer only': (value?: boolean) => ({ value }),
    'selected search only': (value?: boolean) => ({ value }),
 
  }
});




