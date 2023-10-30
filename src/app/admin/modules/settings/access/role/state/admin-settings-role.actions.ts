import { createActionGroup, emptyProps } from '@ngrx/store';
import { FilterSortPaginateInput, Maybe, PageableList_RoleEntity, RoleEntity, RolePrivilegeEntity, UserEntity } from 'src/app/core/api/generated/schema';

export const AdminSettingsRoleActions = createActionGroup({
  source: 'Role Admin Overview',
  events: {
    'set overview data': (roles: PageableList_RoleEntity) => ({ roles }),
    'update params': (params: FilterSortPaginateInput) => ({ params }),

    'get privileges': emptyProps(),
    'privileges retrieved': (result: RolePrivilegeEntity[]) => ({ result }), 

    'get users': emptyProps(),
    'users retrieved': (result: UserEntity[]) => ({ result }), 

    'get role': (entityId: string) => ({ entityId }),
    'role retrieved': (entity?: Maybe<RoleEntity>) => ({ entity }),

    'save': (role: RoleEntity) => ({ role }),
    'saved': emptyProps(),
    'cancelled': emptyProps(),

    'delete role': (role?: Maybe<RoleEntity>) => ({ role }),
    'role deleted': emptyProps(),
  }
});
