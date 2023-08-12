import { createActionGroup, emptyProps } from '@ngrx/store';

export const AdminActions = createActionGroup({
  source: 'Admin',
  events: {
    'toggle menu': emptyProps(),
  }
});




