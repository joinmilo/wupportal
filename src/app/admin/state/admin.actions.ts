import { createActionGroup, emptyProps } from '@ngrx/store';
import { FeatureEntity } from 'src/schema/schema';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'init': emptyProps(),
    'toggle menu': emptyProps(),

    'get features': emptyProps(),
    'set features': (features?: FeatureEntity[]) => ({ features }),
  }
});




