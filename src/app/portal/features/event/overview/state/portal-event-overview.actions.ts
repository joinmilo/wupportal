import { createActionGroup, emptyProps } from '@ngrx/store';
import { EventEntity, FilterSortPaginateInput, Maybe, PageableList_EventEntity } from 'src/schema/schema';

export const PortalEventOverviewActions = createActionGroup({
  source: 'Portal Event Overview',
  events: {
    'get sponsored event': emptyProps(),
    'set sponsored event': (event: Maybe<EventEntity>) => ({ event }),

    'set overview data': (events: PageableList_EventEntity) => ({ events }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
    'params updated': (params: FilterSortPaginateInput) => ({ params }),
  }
});
