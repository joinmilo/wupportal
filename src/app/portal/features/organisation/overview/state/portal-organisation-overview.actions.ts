import { createActionGroup, emptyProps } from '@ngrx/store';
import { OrganisationFilterQueryParams } from 'src/app/core/typings/filter-param';
import { Period } from 'src/app/core/typings/period';
import { FilterSortPaginateInput, Maybe, OrganisationEntity, PageableList_OrganisationEntity } from 'src/schema/schema';

export const PortalOrganisationOverviewActions = createActionGroup({
  source: 'Portal Organisation Overview',
  events: {
    'get sponsored Organisation': emptyProps(),
    'set sponsored Organisation': (organisation: Maybe<OrganisationEntity>) => ({ organisation }),

    'set overview data': (organisations: PageableList_OrganisationEntity) => ({ organisations }),

    'update params': (params: FilterSortPaginateInput) => ({ params }),
    'update raw params': (params: OrganisationFilterQueryParams) => ({ params }),

    'day selected': (day: Period) => ({ day }),
    'month selected': (month?: Period) => ({ month }),
  }
});
