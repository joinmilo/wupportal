import { createActionGroup, emptyProps } from '@ngrx/store';
import { ContestTypeEntity } from 'src/app/core/api/generated/schema';

export const ContestFilterActions = createActionGroup({
  source: 'Contest Filter',
  events: {
    'get types': emptyProps(),
    'set types': (result: ContestTypeEntity[]) => ({ result }),
  }
});
