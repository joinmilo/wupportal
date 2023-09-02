import { createActionGroup, emptyProps } from '@ngrx/store';
import { AdminFooterParentEntity, Maybe } from 'src/app/core/api/generated/schema';

export const AdminFooterActions = createActionGroup({
  source: 'Admin Footer',
  events: {
    'init': emptyProps(),
    'set admin menu': (menu?: Maybe<AdminFooterParentEntity[]>) => ({ menu }),
  }
});




