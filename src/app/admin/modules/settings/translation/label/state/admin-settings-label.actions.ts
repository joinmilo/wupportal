import { createActionGroup, emptyProps } from '@ngrx/store';
import { FilterSortPaginateInput, LanguageEntity, Maybe, PageableList_LabelEntity } from 'src/app/core/api/generated/schema';

export const AdminSettingsLabelActions = createActionGroup({
  source: 'Admin Settings Label Overview',
  events: {

    'set overview data': (labels: PageableList_LabelEntity) => ({ labels }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),

    'delete language': (language?: Maybe<LanguageEntity>) => ({ language }),
    'language deleted': emptyProps(),
  }
});
