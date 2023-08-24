import { createActionGroup, emptyProps } from '@ngrx/store';
import { AddressEntity, AddressEntityInput, Maybe, OrganisationEntity, UserContextEntity, UserContextEntityInput, UserEntityInput } from 'src/app/core/api/generated/schema';

export const AccountActions = createActionGroup({
  source: 'Account',
  events: {    
    'send password reset': (email: Maybe<string> | undefined) => ({ email }),
    'reset password': (token: Maybe<string>, password: Maybe<string>) => ({ token, password }),
    
    'register': (entity: UserEntityInput) => ({ entity }),
    'registered': (entityId: Maybe<string>) => ({ entityId }),

    'verify': (token: Maybe<string>) => ({ token }),
    'verified': (verified: boolean | null | undefined) => ({ verified }),
    'send mail verification': (email: Maybe<string> | undefined) => ({ email }),

    'save first login': (entity: UserContextEntityInput) => ({ entity }),
    'saved first login': (entity: UserContextEntity) => ({ entity }),

    'verify address': (entity: AddressEntityInput) => ({entity}),
    'address verified': (entity: AddressEntity) => ({entity}),

    'get organisations': emptyProps(),
    'set organisations': (entities: Maybe<OrganisationEntity[]>) => ({entities})
  },
});




