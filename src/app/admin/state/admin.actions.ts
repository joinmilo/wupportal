import { createActionGroup, emptyProps } from '@ngrx/store';
import { FeatureEntity } from 'src/schema/schema';
import { AdminRoutes } from '../typings/menu';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'init': emptyProps(),
    'toggle menu': emptyProps(),

    'add routes': (routes: AdminRoutes) => ({ routes }),

    'get features': emptyProps(),
    'set features': (features?: FeatureEntity[]) => ({ features }),

  }
});




