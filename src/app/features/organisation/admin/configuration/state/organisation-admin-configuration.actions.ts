import { createActionGroup, emptyProps } from '@ngrx/store';
import { Maybe, OrganisationConfigurationEntity, OrganisationConfigurationEntityInput, RoleEntity } from 'src/app/core/api/generated/schema';

export const OrganisationAdminConfigurationActions = createActionGroup({
  source: 'Organisation Admin Configuration',
  events: {
    'get organisation configuration': emptyProps(),
    'set organisation configuration': (configuration: Maybe<OrganisationConfigurationEntity>) => ({ configuration }),

    'get roles': emptyProps(),
    'roles retrieved': (result: RoleEntity[]) => ({ result }),

    'save': (configuration: OrganisationConfigurationEntityInput) => ({ configuration }),
    'saved': emptyProps(),
  }
});
