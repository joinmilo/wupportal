import { createActionGroup, emptyProps } from '@ngrx/store';
import { MenuItemEntity } from 'src/schema/schema';

export const FooterActions = createActionGroup({
  source: 'Portal Footer',
  events: {
    'get footer': emptyProps(),
    'set current footer': (menuItems: MenuItemEntity[]) => ({ menuItems })
  }
});