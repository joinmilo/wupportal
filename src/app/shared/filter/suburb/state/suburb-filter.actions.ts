import { createActionGroup, emptyProps } from '@ngrx/store';
import { SuburbEntity } from 'src/app/core/api/generated/schema';

export const SuburbFilterActions = createActionGroup({
  source: 'Suburb Filter',
  events: {
    'get suburbs': emptyProps(),
    'set suburbs': (result: SuburbEntity[]) => ({ result }), 
  }
});




