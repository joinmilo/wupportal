import { createActionGroup, emptyProps } from '@ngrx/store';
import { UserContextEntity } from 'src/app/core/api/generated/schema';
import { Cookie } from 'src/app/core/components/cookie/typings/cookie';

export const CoreUserActions = createActionGroup({
  source: 'Core User',
  events: {
    'init': emptyProps(),
    'login': (email: string, password: string) => ({ email, password }),
    'logged in': emptyProps(),
    'update user': emptyProps(),
    'get me': (user: UserContextEntity) => ({ user }),
    'refresh expired': emptyProps(),
    'logout': emptyProps(),
    'require login': emptyProps(),
    'save cookie settings': (cookieSettings: Cookie) => ({cookieSettings}),
    'allow external content': emptyProps(),
  },
});




