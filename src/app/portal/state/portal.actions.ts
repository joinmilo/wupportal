import { createActionGroup, emptyProps } from '@ngrx/store';
import { FeatureEntity, Maybe, MenuItemEntity } from 'src/app/core/api/generated/schema';

export const PortalActions = createActionGroup({
  source: 'Portal',
  events: {
    'init': emptyProps(),

    'set menu': (menuItems: MenuItemEntity[]) => ({ menuItems }),

    'navigate menu': (item: Maybe<MenuItemEntity>) => ({ item }),
    'navigate details': (slug?: Maybe<string>, feature?: Maybe<FeatureEntity>) => ({ slug, feature }),
    'not found': emptyProps(),
  },
});
