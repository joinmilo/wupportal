import { createActionGroup, emptyProps } from '@ngrx/store';
import { MenuItemEntity } from 'src/schema/schema';

export const CommonActions = createActionGroup({
  source: 'Portal Common',
  events: {
    'get menu': emptyProps(),
    'menu retrieved': (menuItems: MenuItemEntity[]) => ({ menuItems }),
  },
});




