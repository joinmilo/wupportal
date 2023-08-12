import { createActionGroup, emptyProps } from '@ngrx/store';
import { PageEntity } from 'src/schema/schema';

export const PortalLandingActions = createActionGroup({
  source: 'Portal Landing',
  events: {
    'get landing page': emptyProps(),
    'set landing page': (page: PageEntity) => ({ page }),
  }
});




