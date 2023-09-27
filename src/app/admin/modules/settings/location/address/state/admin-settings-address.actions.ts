import { createActionGroup, emptyProps } from '@ngrx/store';
import { AddressEntity, AddressEntityInput, FilterSortPaginateInput, Maybe, PageableList_AddressEntity } from 'src/app/core/api/generated/schema';

export const AdminSettingsAddressActions = createActionGroup({
  source: 'Address Admin Overview',
  events: {
    'set overview data': (addresss: PageableList_AddressEntity) => ({ addresss }),
    'update params': (params: FilterSortPaginateInput) => ({ params }),

    'get address': (entityId: string) => ({ entityId }),
    'address retrieved': (entity?: Maybe<AddressEntity>) => ({ entity }),

    'save': (address: AddressEntityInput) => ({ address }),
    'saved': emptyProps(),
    'cancelled': emptyProps(),

    'delete': (address?: Maybe<AddressEntity>) => ({ address }),
    'deleted': emptyProps(),
  }
});
