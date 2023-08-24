import { createActionGroup } from '@ngrx/store';
import { Maybe, PageEntity } from 'src/app/core/api/generated/schema';

export const PortalPageActions = createActionGroup({
  source: 'Portal Page',
  events: {
    'get page': (slug?: Maybe<string>) => ({ slug }),
    'set page': (page: PageEntity) => ({ page }),
  }
});




