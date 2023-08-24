import { createActionGroup, emptyProps } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, OrganisationEntity, PageableList_OrganisationEntity } from 'src/app/core/api/generated/schema';

export const PortalOrganisationOverviewActions = createActionGroup({
  source: 'Portal Organisation Overview',
  events: {
    'get sponsored Organisation': emptyProps(),
    'set sponsored Organisation': (organisation: Maybe<OrganisationEntity>) => ({ organisation }),

    'set overview data': (organisations: PageableList_OrganisationEntity) => ({ organisations }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
  }
});
