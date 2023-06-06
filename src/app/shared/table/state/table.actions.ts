import { createActionGroup } from '@ngrx/store';
import { FilterSortPaginateInput } from 'src/schema/schema';

export const TableActions = createActionGroup({
  source: 'Table',
  events: {
    'set sort pagination': (params?: FilterSortPaginateInput) => ({ params }),
  }
});




