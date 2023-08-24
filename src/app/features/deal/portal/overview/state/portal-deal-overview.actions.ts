import { createActionGroup, emptyProps } from '@ngrx/store';
import { DealEntity, FilterSortPaginateInput, Maybe, PageableList_DealEntity } from 'src/app/core/api/generated/schema';

export const PortalDealOverviewActions = createActionGroup({
  source: 'Portal Deal Overview',
  events: {
    'get sponsored deal': emptyProps(),
    'set sponsored deal': (deal: Maybe<DealEntity>) => ({ deal }),

    'set overview data': (deals: PageableList_DealEntity) => ({ deals }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
  }
});
