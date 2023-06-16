import { createActionGroup, emptyProps } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, PageableList_UserContextEntity } from 'src/schema/schema';

export const PortalAuthorOverviewActions = createActionGroup({
  source: 'Portal Author Overview',
  events: {
    'get overview data': emptyProps(),
    'set overview data': (authors?: Maybe<PageableList_UserContextEntity>) => ({ authors }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
  }
});




