import { createActionGroup, emptyProps } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, PageableList_SuburbEntity, SuburbEntity, SuburbEntityInput } from 'src/app/core/api/generated/schema';

export const AdminSettingsSuburbActions = createActionGroup({
  source: 'Suburb Admin Overview',
  events: {
    'set overview data': (suburbs: PageableList_SuburbEntity) => ({ suburbs }),
    'update params': (params: FilterSortPaginateInput) => ({ params }),

    'get suburb': (entityId: string) => ({ entityId }),
    'suburb retrieved': (entity?: Maybe<SuburbEntity>) => ({ entity }),

    'save': (suburb: SuburbEntityInput) => ({ suburb }),
    'saved': emptyProps(),
    'cancelled': emptyProps(),

    'delete': (suburb?: Maybe<SuburbEntity>) => ({ suburb }),
    'deleted': emptyProps(),
  }
});
