import { createActionGroup } from '@ngrx/store';
import { Maybe } from 'graphql/jsutils/Maybe';
import { DealEntity } from 'src/app/core/api/generated/schema';

export const PortalDealDetailsActions = createActionGroup({
  source: 'Portal Deal Details',
  events: {
    'get details': (slug: Maybe<string>) => ({ slug }),
    'set details': (deal: Maybe<DealEntity>) => ({ deal }),
  }
});