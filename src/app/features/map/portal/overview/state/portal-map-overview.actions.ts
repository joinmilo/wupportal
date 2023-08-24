import { createActionGroup, props } from '@ngrx/store';
import { DealEntity, EventEntity, FilterSortPaginateInput, OrganisationEntity, } from 'src/app/core/api/generated/schema';
import { MapEntityFilter } from 'src/app/core/typings/filter-params/map-filter-param';

export const MapFeatureActions = createActionGroup({
  source: 'Portal Map Overview',
  events: {
    'set entity filter': (entity: MapEntityFilter) => ({ entity }),
    'set filter params': (params: FilterSortPaginateInput) => ({ params }),

    'set events': props<{events: EventEntity[]}>(),
    'set organisations': props<{organisations: OrganisationEntity[]}>(),
    'set deals': props<{deals: DealEntity[]}>(),
  }
})
