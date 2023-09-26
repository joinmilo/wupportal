import { createActionGroup, emptyProps } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, PageableList_SuburbEntity, SuburbEntity, SuburbEntityInput } from 'src/app/core/api/generated/schema';

export const AdminSettingsSuburbActions = createActionGroup({
  source: 'Suburb Admin Overview',
  events: {
    'set overview data': (suburbs: PageableList_SuburbEntity) => ({ suburbs }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),

    'save': (suburb: SuburbEntityInput) => ({ suburb }),
    'saved': emptyProps(),
    'delete': (suburb?: Maybe<SuburbEntity>) => ({ suburb }),
    'deleted': emptyProps(),
  }
});
