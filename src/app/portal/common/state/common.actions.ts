import { createActionGroup, emptyProps } from '@ngrx/store';
import { MenuItemEntity, SocialMediaEntity } from 'src/schema/schema';

export const CommonActions = createActionGroup({
  source: 'Portal Common',
  events: {
    'get menu': emptyProps(),
    'menu retrieved': (menuItems: MenuItemEntity[]) => ({ menuItems }),

    'get social media': emptyProps(),
    'social media retrieved': (socialMedia: SocialMediaEntity[]) => ({ socialMedia }),

    'not found': emptyProps(),
  },
});




