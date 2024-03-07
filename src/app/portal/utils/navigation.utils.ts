import { Maybe, MenuItemEntity } from 'src/app/core/api/generated/schema';
import { portalUrl } from 'src/app/core/constants/module.constants';

export const portalMenuRoute = (item: Maybe<MenuItemEntity>): string[] =>
  item?.plugin?.code
    ? ['/', portalUrl, item.plugin.code]
    : item?.page?.slug
      ? ['/', portalUrl, item.page.slug]
      : ['/', portalUrl, '404'];