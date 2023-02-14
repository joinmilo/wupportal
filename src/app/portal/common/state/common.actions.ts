import { createActionGroup, emptyProps } from '@ngrx/store';
import { MenuItemEntity } from 'src/schema/schema';

export const CommonActions = createActionGroup({
  source: 'Portal Common',
  events: {
    'Get Menu': emptyProps(),
    'Menu retrieved': (menuItems: MenuItemEntity[]) => ({ menuItems }),
  },
});




