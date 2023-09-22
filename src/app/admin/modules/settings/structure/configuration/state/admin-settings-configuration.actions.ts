import { createActionGroup, emptyProps } from '@ngrx/store';
import { ConfigurationEntity, FilterSortPaginateInput, Maybe, PageableList_ConfigurationEntity } from 'src/app/core/api/generated/schema';

export const AdminSettingsConfiguratioActions = createActionGroup({
  source: 'Admin Settings Configuration Overview',
  events: {
    'set overview data': (configurations: PageableList_ConfigurationEntity) => ({ configurations }),
    'update params': (params: FilterSortPaginateInput) => ({ params }),

    'save configuration': (configuration: Maybe<ConfigurationEntity>) => ({ configuration }),
    'configuration saved': emptyProps(),
  }
});
